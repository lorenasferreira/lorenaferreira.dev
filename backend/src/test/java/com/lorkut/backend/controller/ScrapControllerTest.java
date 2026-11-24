package com.lorkut.backend.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.lorkut.backend.service.ScrapService;

class ScrapControllerTest {
    private final ScrapService service = mock(ScrapService.class);

    @Test
    void moderationRoutesAreClosedWhenUnconfiguredAndRequireTheTokenWhenEnabled() throws Exception {
        var disabled = MockMvcBuilders.standaloneSetup(new ScrapController(service, "")).build();
        disabled.perform(delete("/api/scraps/1")).andExpect(status().isNotFound());
        var enabled = MockMvcBuilders.standaloneSetup(new ScrapController(service, "test-token")).build();
        enabled.perform(get("/api/scraps/pending")).andExpect(status().isUnauthorized());
        enabled.perform(patch("/api/scraps/1/approve")).andExpect(status().isUnauthorized());
        enabled.perform(delete("/api/scraps/1").header("Authorization", "Bearer wrong"))
                .andExpect(status().isUnauthorized());
        verifyNoInteractions(service);

        when(service.deleteScrap(1, false)).thenReturn(true);
        enabled.perform(delete("/api/scraps/1").header("Authorization", "Bearer test-token"))
                .andExpect(status().isNoContent());
        verify(service).deleteScrap(1, false);
    }

    @Test
    void submissionRequiresConfirmationFieldAndUsesMultipartPhoto() throws Exception {
        var mvc = MockMvcBuilders.standaloneSetup(new ScrapController(service, "")).build();
        mvc.perform(multipart("/api/scraps").param("author", "Test").param("message", "Hello"))
                .andExpect(status().isBadRequest());
        verifyNoInteractions(service);
        var photo = new MockMultipartFile("photo", "image.png", "image/png", new byte[] {1});
        mvc.perform(multipart("/api/scraps").file(photo).param("author", "Test")
                .param("message", "Hello").param("confirmed", "true"))
                .andExpect(status().isCreated()).andExpect(content().string(""));
        verify(service).createScrap(eq("Test"), eq("Hello"), eq(true), eq(photo));
    }
}
