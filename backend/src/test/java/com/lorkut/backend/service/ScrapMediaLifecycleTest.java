package com.lorkut.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.lorkut.backend.model.Scrap;
import com.lorkut.backend.repository.ScrapRepository;
import com.lorkut.backend.repository.ScrapTranslationRepository;

class ScrapMediaLifecycleTest {
    private final ScrapRepository scraps = mock(ScrapRepository.class);
    private final ScrapTranslationRepository translations = mock(ScrapTranslationRepository.class);
    private final ScrapMediaService media = mock(ScrapMediaService.class);
    private final ScrapService service = new ScrapService(scraps, translations, media);

    @Test
    void validatesImageContentAndRejectsMismatchedMimeAndOversize() throws Exception {
        var source = new ByteArrayOutputStream();
        ImageIO.write(new BufferedImage(3, 3, BufferedImage.TYPE_INT_RGB), "png", source);
        byte[] bytes = source.toByteArray();
        var image = ScrapMediaService.normalize(new MockMultipartFile("photo", "test.png", "image/png", bytes));
        assertEquals("png", image.format());
        assertThrows(ResponseStatusException.class,
                () -> ScrapMediaService.normalize(new MockMultipartFile("photo", "test.jpg", "image/jpeg", bytes)));
        assertThrows(ResponseStatusException.class,
                () -> ScrapMediaService.normalize(new MockMultipartFile("photo", "fake.png", "image/png", new byte[] {1})));
        assertThrows(ResponseStatusException.class,
                () -> ScrapMediaService.normalize(new MockMultipartFile("photo", "test.png", "image/png", new byte[5 * 1024 * 1024 + 1])));
    }

    @Test
    void rejectsUnconfirmedSubmissionsBeforeUsingStorage() {
        assertEquals(HttpStatus.BAD_REQUEST,
                assertThrows(ResponseStatusException.class, () -> service.createScrap("Test", "Hello", false, null))
                        .getStatusCode());
        verifyNoInteractions(scraps, media);
    }

    @Test
    void savesServerOwnedIdentifierAndCleansUpIfDatabaseWriteFails() {
        var photo = new MockMultipartFile("photo", new byte[] {1});
        var uploaded = new ScrapMediaService.UploadedImage("lorkut-scraps/test", "https://res.cloudinary.com/test");
        when(media.upload(photo)).thenReturn(uploaded);
        when(scraps.saveAndFlush(any(Scrap.class))).thenAnswer(invocation -> invocation.getArgument(0));
        var scrap = service.createScrap(" Test ", " Hello ", true, photo);
        assertEquals("Test", scrap.getAuthor());
        assertEquals("Hello", scrap.getMessage());
        assertEquals(uploaded.public_id(), scrap.getAvatarPublicId());
        assertFalse(scrap.getApproved());
        doThrow(new IllegalStateException()).when(scraps).saveAndFlush(any(Scrap.class));
        assertThrows(ResponseStatusException.class, () -> service.createScrap("Test", "Hello", true, photo));
        verify(media).cleanup(uploaded.public_id());
    }

    @Test
    void retainsTheRecordWhenCloudRemovalFailsAndRetriesByIdentifier() {
        var scrap = new Scrap("Test", "Hello", "https://res.cloudinary.com/test");
        scrap.setAvatarPublicId("lorkut-scraps/test");
        when(scraps.findById(1)).thenReturn(Optional.of(scrap));
        doThrow(new ResponseStatusException(HttpStatus.BAD_GATEWAY)).doNothing().when(media).destroy(scrap.getAvatarPublicId());
        assertThrows(ResponseStatusException.class, () -> service.deleteScrap(1, false));
        verify(scraps, never()).delete(any());
        assertTrue(service.deleteScrap(1, false));
        verify(media, times(2)).destroy(scrap.getAvatarPublicId());
        verify(translations, times(2)).deleteAllByIdInBatch(ScrapTranslationService.translationKeys("Hello"));
        verify(scraps).delete(scrap);
    }

    @Test
    void removesOnlyManagedPhotoWhenRequested() {
        var scrap = new Scrap("Test", "Hello", "https://res.cloudinary.com/test");
        scrap.setAvatarPublicId("lorkut-scraps/test");
        when(scraps.findById(1)).thenReturn(Optional.of(scrap));
        assertTrue(service.deletePhoto(1, false));
        assertNull(scrap.getAvatar());
        assertNull(scrap.getAvatarPublicId());
        assertEquals("Hello", scrap.getMessage());
        verify(media).destroy("lorkut-scraps/test");
        verify(scraps, never()).delete(any());
        verifyNoInteractions(translations);
    }

    @Test
    void legacyPhotoRequiresExplicitManualReview() {
        var scrap = new Scrap("Test", "Hello", "https://res.cloudinary.com/test");
        when(scraps.findById(1)).thenReturn(Optional.of(scrap));
        assertEquals(HttpStatus.CONFLICT,
                assertThrows(ResponseStatusException.class, () -> service.deleteScrap(1, false)).getStatusCode());
        verifyNoInteractions(media, translations);
        assertTrue(service.deleteScrap(1, true));
        verifyNoInteractions(media);
    }
}
