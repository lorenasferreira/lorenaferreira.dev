package com.lorkut.backend.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.time.Duration;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.imageio.stream.MemoryCacheImageInputStream;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ScrapMediaService {
    private static final long MAX_BYTES = 5 * 1024 * 1024;
    private static final long MAX_PIXELS = 8_000_000;
    private final RestClient client;

    public record UploadedImage(String public_id, String secure_url) {}
    public record DestroyResult(String result) {}
    record ImageData(byte[] bytes, String format) {}

    public ScrapMediaService(@Value("${CLOUDINARY_CLOUD_NAME:}") String cloud,
            @Value("${CLOUDINARY_API_KEY:}") String key,
            @Value("${CLOUDINARY_API_SECRET:}") String secret) {
        if (!cloud.matches("[a-zA-Z0-9_-]+") || key.isBlank() || secret.isBlank()) {
            client = null;
            return;
        }
        var factory = new JdkClientHttpRequestFactory(HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(5)).build());
        factory.setReadTimeout(Duration.ofSeconds(15));
        client = RestClient.builder().requestFactory(factory)
                .baseUrl("https://api.cloudinary.com/v1_1/" + cloud + "/image")
                .defaultHeaders(headers -> headers.setBasicAuth(key, secret))
                .build();
    }

    public UploadedImage upload(MultipartFile file) {
        var image = normalize(file);
        requireConfigured();
        String publicId = "lorkut-scraps/" + UUID.randomUUID();
        var fields = new LinkedMultiValueMap<String, Object>();
        fields.add("public_id", publicId);
        fields.add("overwrite", "false");
        fields.add("file", new ByteArrayResource(image.bytes()) {
            @Override
            public String getFilename() {
                return "avatar." + image.format();
            }
        });
        try {
            var result = client.post().uri("/upload")
                    .contentType(MediaType.MULTIPART_FORM_DATA).body(fields)
                    .retrieve().body(UploadedImage.class);
            if (result != null && publicId.equals(result.public_id())
                    && result.secure_url() != null && result.secure_url().length() <= 500) {
                var url = URI.create(result.secure_url());
                if ("https".equals(url.getScheme()) && "res.cloudinary.com".equals(url.getHost())) {
                    return result;
                }
            }
        } catch (RuntimeException ignored) {
            // The upload may have completed even when the response was lost.
        }
        cleanup(publicId);
        throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Photo upload unavailable");
    }

    static ImageData normalize(MultipartFile file) {
        if (file.isEmpty() || file.getSize() > MAX_BYTES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Photo must be at most 5 MB");
        }
        try (var input = new MemoryCacheImageInputStream(file.getInputStream())) {
            var readers = ImageIO.getImageReaders(input);
            if (readers.hasNext()) {
                var reader = readers.next();
                try {
                    reader.setInput(input, true, true);
                    String format = reader.getFormatName().toLowerCase(java.util.Locale.ROOT);
                    String expectedMime = "jpeg".equals(format) ? "image/jpeg" : "image/" + format;
                    if (("jpeg".equals(format) || "png".equals(format))
                            && expectedMime.equals(file.getContentType())
                            && (long) reader.getWidth(0) * reader.getHeight(0) <= MAX_PIXELS) {
                        BufferedImage image = reader.read(0);
                        try (var output = new ByteArrayOutputStream()) {
                            if (ImageIO.write(image, format, output)) {
                                return new ImageData(output.toByteArray(), format);
                            }
                        }
                    }
                } finally {
                    reader.dispose();
                }
            }
        } catch (IOException | RuntimeException ignored) {
            // Report a generic error and do not retain the supplied file name or data.
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JPEG or PNG photo");
    }

    public void destroy(String publicId) {
        requireConfigured();
        var fields = new LinkedMultiValueMap<String, String>();
        fields.add("public_id", publicId);
        fields.add("invalidate", "true");
        try {
            var response = client.post().uri("/destroy")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED).body(fields)
                    .retrieve().body(DestroyResult.class);
            if (response != null && ("ok".equals(response.result()) || "not found".equals(response.result()))) {
                return;
            }
        } catch (RuntimeException ignored) {
            // Do not pass provider details or credentials back to the browser.
        }
        throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Photo removal unavailable");
    }

    public void cleanup(String publicId) {
        try {
            destroy(publicId);
        } catch (RuntimeException ignored) {
            LoggerFactory.getLogger(ScrapMediaService.class)
                    .warn("Manual cleanup required for Cloudinary scrap asset {}", publicId);
        }
    }

    private void requireConfigured() {
        if (client == null) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Photo storage unavailable");
        }
    }
}
