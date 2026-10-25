package com.lorkut.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "scrap_translations")
public class ScrapTranslation {
    @Id
    @Column(length = 80)
    private String id;
    @Column(nullable = false, length = 8000)
    private String translatedText;
    @Column(nullable = false, length = 12)
    private String sourceLanguage;

    protected ScrapTranslation() {}
    public ScrapTranslation(String id, String text, String sourceLanguage) {
        this.id = id;
        this.translatedText = text;
        this.sourceLanguage = sourceLanguage;
    }
    public String getTranslatedText() { return translatedText; }
    public String getSourceLanguage() { return sourceLanguage; }
}
