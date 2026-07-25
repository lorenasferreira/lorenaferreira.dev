package com.lorkut.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lorkut.backend.model.Scrap;
import com.lorkut.backend.repository.ScrapRepository;

@Service
public class ScrapService {

    private final ScrapRepository scrapRepository;

    public ScrapService(ScrapRepository scrapRepository) {
        this.scrapRepository = scrapRepository;
    }

    public List<Scrap> getApprovedScraps() {
        return scrapRepository.findAllByApprovedTrueOrderByCreatedAtDesc();
    }

    public List<Scrap> getPendingScraps() {
        return scrapRepository.findAllByApprovedFalseOrderByCreatedAtDesc();
    }

    public Scrap createScrap(Scrap scrap) {

        // Nunca confiamos no frontend.
        scrap.setApproved(false);

        return scrapRepository.save(scrap);
    }

    public Optional<Scrap> approveScrap(Integer id) {

        Optional<Scrap> optionalScrap = scrapRepository.findById(id);

        if (optionalScrap.isEmpty()) {
            return Optional.empty();
        }

        Scrap scrap = optionalScrap.get();

        scrap.setApproved(true);

        return Optional.of(scrapRepository.save(scrap));
    }

    public boolean deleteScrap(Integer id) {

        if (!scrapRepository.existsById(id)) {
            return false;
        }

        scrapRepository.deleteById(id);

        return true;
    }
}