package com.lorkut.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lorkut.backend.model.Scrap;
import com.lorkut.backend.service.ScrapService;

@RestController
@RequestMapping("/api/scraps")

public class ScrapController {

    private final ScrapService scrapService;

    public ScrapController(ScrapService scrapService) {
        this.scrapService = scrapService;
    }

    @GetMapping
    public List<Scrap> getApprovedScraps() {
        return scrapService.getApprovedScraps();
    }

    @GetMapping("/pending")
    public List<Scrap> getPendingScraps() {
        return scrapService.getPendingScraps();
    }

    @PostMapping
    public ResponseEntity<Scrap> createScrap(@RequestBody Scrap scrap) {
        Scrap createdScrap = scrapService.createScrap(scrap);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdScrap);
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Scrap> approveScrap(@PathVariable Integer id) {
        return scrapService
                .approveScrap(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScrap(@PathVariable Integer id) {
        boolean deleted = scrapService.deleteScrap(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}