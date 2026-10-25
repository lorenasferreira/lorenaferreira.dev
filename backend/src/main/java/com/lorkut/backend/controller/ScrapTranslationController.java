package com.lorkut.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.lorkut.backend.service.ScrapTranslationService;

@RestController
@RequestMapping("/api/scraps")
public class ScrapTranslationController {
    private final ScrapTranslationService translations;
    public ScrapTranslationController(ScrapTranslationService translations) { this.translations = translations; }
    @PostMapping("/{id}/translations/{language}")
    public ScrapTranslationService.Translation translate(@PathVariable Integer id, @PathVariable String language) {
        return translations.translate(id, language);
    }
}
