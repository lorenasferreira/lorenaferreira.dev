package com.lorkut.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lorkut.backend.model.ScrapTranslation;

public interface ScrapTranslationRepository extends JpaRepository<ScrapTranslation, String> {}
