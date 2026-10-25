package com.lorkut.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.lorkut.backend.model.Scrap;
import com.lorkut.backend.model.ScrapTranslation;
import com.lorkut.backend.repository.ScrapRepository;
import com.lorkut.backend.repository.ScrapTranslationRepository;

class ScrapTranslationServiceTest {
    private final ScrapRepository scraps = mock(ScrapRepository.class);
    private final ScrapTranslationRepository cache = mock(ScrapTranslationRepository.class);
    private final ScrapTranslationService service = new ScrapTranslationService(scraps, cache, "");
    @Test void rejectsUnsupportedLanguageWithoutReadingScraps() {
        assertEquals(HttpStatus.BAD_REQUEST, assertThrows(ResponseStatusException.class, () -> service.translate(1, "xx")).getStatusCode());
        verifyNoInteractions(scraps, cache);
    }
    @Test void neverTranslatesUnapprovedScrap() {
        when(scraps.findById(1)).thenReturn(Optional.of(new Scrap("Visitor", "Hello", null)));
        assertEquals(HttpStatus.NOT_FOUND, assertThrows(ResponseStatusException.class, () -> service.translate(1, "pt")).getStatusCode());
        verifyNoInteractions(cache);
    }
    @Test void servesPersistentCacheWithoutCredentialAndKeepsOriginal() {
        var scrap = new Scrap("Visitor", "Hello\n💜", null);
        scrap.setApproved(true);
        when(scraps.findById(1)).thenReturn(Optional.of(scrap));
        when(cache.findById(anyString())).thenReturn(Optional.of(new ScrapTranslation("key", "Olá\n💜", "EN")));
        assertEquals("Olá\n💜", service.translate(1, "pt").text());
        assertEquals("Hello\n💜", scrap.getMessage());
        verify(cache, never()).save(any());
    }
    @Test void missingCredentialReturnsUnavailableWithoutCachingFailure() {
        var scrap = new Scrap("Visitor", "Hello", null);
        scrap.setApproved(true);
        when(scraps.findById(1)).thenReturn(Optional.of(scrap));
        when(cache.findById(anyString())).thenReturn(Optional.empty());
        assertEquals(HttpStatus.SERVICE_UNAVAILABLE, assertThrows(ResponseStatusException.class, () -> service.translate(1, "pt")).getStatusCode());
        verify(cache, never()).save(any());
    }
}
