package com.lorkut.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.lorkut.backend.model.Scrap;
import com.lorkut.backend.repository.ScrapRepository;
import com.lorkut.backend.repository.ScrapTranslationRepository;

@Service
public class ScrapService {
    private final ScrapRepository scrapRepository;
    private final ScrapTranslationRepository translations;
    private final ScrapMediaService media;

    public ScrapService(ScrapRepository scrapRepository, ScrapTranslationRepository translations,
            ScrapMediaService media) {
        this.scrapRepository = scrapRepository;
        this.translations = translations;
        this.media = media;
    }

    public List<Scrap> getApprovedScraps() {
        return scrapRepository.findAllByApprovedTrueOrderByCreatedAtDesc();
    }

    public List<Scrap> getPendingScraps() {
        return scrapRepository.findAllByApprovedFalseOrderByCreatedAtDesc();
    }

    public Scrap createScrap(String author, String message, boolean confirmed, MultipartFile photo) {
        author = author.strip();
        message = message.strip();
        if (!confirmed || author.isEmpty() || author.length() > 100 || message.isEmpty() || message.length() > 780) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid scrap submission");
        }

        var scrap = new Scrap(author, message, null);
        if (photo != null) {
            var uploaded = media.upload(photo);
            scrap.setAvatar(uploaded.secure_url());
            scrap.setAvatarPublicId(uploaded.public_id());
        }

        try {
            return scrapRepository.saveAndFlush(scrap);
        } catch (RuntimeException error) {
            if (scrap.getAvatarPublicId() != null) media.cleanup(scrap.getAvatarPublicId());
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Scrap could not be saved");
        }
    }

    @Transactional
    public Optional<Scrap> approveScrap(Integer id) {
        return scrapRepository.findById(id).map(scrap -> {
            scrap.setApproved(true);
            return scrap;
        });
    }

    @Transactional
    public boolean deleteScrap(Integer id, boolean legacyPhotoHandled) {
        var item = scrapRepository.findById(id);
        if (item.isEmpty()) return false;

        Scrap scrap = item.get();
        requireLegacyReview(scrap, legacyPhotoHandled);
        translations.deleteAllByIdInBatch(ScrapTranslationService.translationKeys(scrap.getMessage()));
        removePhoto(scrap);
        scrapRepository.delete(scrap);
        return true;
    }

    @Transactional
    public boolean deletePhoto(Integer id, boolean legacyPhotoHandled) {
        var item = scrapRepository.findById(id);
        if (item.isEmpty()) return false;

        Scrap scrap = item.get();
        requireLegacyReview(scrap, legacyPhotoHandled);
        removePhoto(scrap);
        scrap.setAvatar(null);
        scrap.setAvatarPublicId(null);
        return true;
    }

    private void requireLegacyReview(Scrap scrap, boolean legacyPhotoHandled) {
        if (scrap.getAvatarPublicId() == null && scrap.getAvatar() != null && !scrap.getAvatar().isBlank()
                && !legacyPhotoHandled) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Legacy photo requires manual review");
        }
    }

    private void removePhoto(Scrap scrap) {
        if (scrap.getAvatarPublicId() != null) media.destroy(scrap.getAvatarPublicId());
    }
}
