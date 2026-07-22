package com.lorkut.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lorkut.backend.model.Community;
import com.lorkut.backend.repository.CommunityRepository;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAllByOrderByCreatedAtAsc();
    }

    public Optional<Community> getCommunityBySlug(String slug) {
        return communityRepository.findBySlug(slug);
    }
}