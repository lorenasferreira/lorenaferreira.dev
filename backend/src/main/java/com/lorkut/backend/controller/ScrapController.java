package com.lorkut.backend.controller;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.lorkut.backend.model.Scrap;
import com.lorkut.backend.service.ScrapService;

@RestController
@RequestMapping("/api/scraps")
public class ScrapController {
    private final ScrapService scrapService;
    private final String moderationToken;

    public record ScrapView(Integer id, String author, String message, String avatar,
            Boolean approved, java.time.LocalDateTime createdAt) {
        static ScrapView of(Scrap scrap) {
            return new ScrapView(scrap.getId(), scrap.getAuthor(), scrap.getMessage(),
                    scrap.getAvatar(), scrap.getApproved(), scrap.getCreatedAt());
        }
    }

    public ScrapController(ScrapService scrapService,
            @Value("${SCRAP_MODERATION_TOKEN:}") String moderationToken) {
        this.scrapService = scrapService;
        this.moderationToken = moderationToken;
    }

    @GetMapping
    public List<ScrapView> getApprovedScraps() {
        return scrapService.getApprovedScraps().stream().map(ScrapView::of).toList();
    }

    @GetMapping("/pending")
    public List<ScrapView> getPendingScraps(@RequestHeader(value = "Authorization", required = false) String auth) {
        requireModerator(auth);
        return scrapService.getPendingScraps().stream().map(ScrapView::of).toList();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> createScrap(@RequestParam String author, @RequestParam String message,
            @RequestParam boolean confirmed, @RequestParam(required = false) MultipartFile photo) {
        scrapService.createScrap(author, message, confirmed, photo);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<ScrapView> approveScrap(@PathVariable Integer id,
            @RequestHeader(value = "Authorization", required = false) String auth) {
        requireModerator(auth);
        return scrapService.approveScrap(id)
                .map(ScrapView::of).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScrap(@PathVariable Integer id,
            @RequestParam(defaultValue = "false") boolean legacyPhotoHandled,
            @RequestHeader(value = "Authorization", required = false) String auth) {
        requireModerator(auth);
        return scrapService.deleteScrap(id, legacyPhotoHandled) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/photo")
    public ResponseEntity<Void> deletePhoto(@PathVariable Integer id,
            @RequestParam(defaultValue = "false") boolean legacyPhotoHandled,
            @RequestHeader(value = "Authorization", required = false) String auth) {
        requireModerator(auth);
        return scrapService.deletePhoto(id, legacyPhotoHandled) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    private void requireModerator(String authorization) {
        if (moderationToken.isBlank()) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        if (authorization == null || !MessageDigest.isEqual(
                ("Bearer " + moderationToken).getBytes(StandardCharsets.UTF_8),
                authorization.getBytes(StandardCharsets.UTF_8))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
