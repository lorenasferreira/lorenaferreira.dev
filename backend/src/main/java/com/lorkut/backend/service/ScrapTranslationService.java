package com.lorkut.backend.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.Locale;
import java.net.http.HttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import com.lorkut.backend.model.ScrapTranslation;
import com.lorkut.backend.repository.ScrapRepository;
import com.lorkut.backend.repository.ScrapTranslationRepository;

@Service
public class ScrapTranslationService {
    private final ScrapRepository scraps;
    private final ScrapTranslationRepository cache;
    private final String apiKey;
    private final RestClient client;
    public record Translation(String text, String sourceLanguage) {}
    public record ProviderTranslation(String text, String detected_source_language) {}
    public record ProviderResponse(List<ProviderTranslation> translations) {}

    public ScrapTranslationService(ScrapRepository scraps, ScrapTranslationRepository cache,
            @Value("${DEEPL_API_KEY:}") String apiKey) {
        this.scraps = scraps;
        this.cache = cache;
        this.apiKey = apiKey;
        var factory = new JdkClientHttpRequestFactory(HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build());
        factory.setReadTimeout(Duration.ofSeconds(15));
        this.client = RestClient.builder().requestFactory(factory)
            .baseUrl(apiKey.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com").build();
    }

    // Serialize misses in this instance to avoid duplicate paid requests on concurrent clicks.
    public synchronized Translation translate(Integer id, String target) {
        target = target.toLowerCase(Locale.ROOT);
        if (!List.of("pt", "en", "es", "fr").contains(target))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported language");
        var scrap = scraps.findById(id).filter(item -> Boolean.TRUE.equals(item.getApproved()))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        String message = scrap.getMessage();
        String key;
        try {
            key = HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(message.getBytes(StandardCharsets.UTF_8))) + ":" + target;
        } catch (java.security.NoSuchAlgorithmException exception) { throw new IllegalStateException(exception); }
        var cached = cache.findById(key);
        if (cached.isPresent()) return new Translation(cached.get().getTranslatedText(), cached.get().getSourceLanguage());
        if (apiKey.isBlank()) throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Translation not configured");
        try {
            // Translate each line separately; blank and decorative lines never leave the backend.
            String[] lines = message.split("\\n", -1);
            var indexes = new java.util.ArrayList<Integer>();
            var texts = new java.util.ArrayList<String>();
            for (int index = 0; index < lines.length; index++) {
                if (lines[index].codePoints().anyMatch(Character::isLetter)) { indexes.add(index); texts.add(lines[index]); }
            }
            String source = "und";
            if (!texts.isEmpty()) {
                // Provider accepts at most 50 text entries per request.
                for (int offset = 0; offset < texts.size(); offset += 50) {
                    var batch = texts.subList(offset, Math.min(offset + 50, texts.size()));
                    var response = client.post().uri("/v2/translate")
                        .header("Authorization", "DeepL-Auth-Key " + apiKey)
                        .body(Map.of("text", batch, "target_lang", target.equals("pt") ? "PT-BR" : target.toUpperCase(Locale.ROOT), "preserve_formatting", true))
                        .retrieve().body(ProviderResponse.class);
                    if (response == null || response.translations() == null || response.translations().size() != batch.size()) throw new IllegalStateException();
                    for (int index = 0; index < batch.size(); index++) {
                        var result = response.translations().get(index);
                        if (result.text() == null || result.detected_source_language() == null) throw new IllegalStateException();
                        lines[indexes.get(offset + index)] = result.text();
                        if (offset == 0 && index == 0) source = result.detected_source_language();
                    }
                }
            }
            String text = String.join("\n", lines);
            cache.save(new ScrapTranslation(key, text, source));
            return new Translation(text, source);
        } catch (Exception exception) {
            // Do not expose upstream responses, credentials or visitor messages.
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Translation unavailable");
        }
    }
}
