package com.lorkut.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lorkut.backend.model.ActivityFeed;

public interface ActivityFeedRepository
        extends JpaRepository<ActivityFeed, Integer> {

    List<ActivityFeed> findAllByOrderByCreatedAtDesc();

}