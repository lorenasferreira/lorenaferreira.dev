package com.lorkut.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lorkut.backend.model.Community;

public interface CommunityRepository extends JpaRepository<Community, Integer> {

    List<Community> findAllByOrderByCreatedAtAsc();

    Optional<Community> findBySlug(String slug);

}