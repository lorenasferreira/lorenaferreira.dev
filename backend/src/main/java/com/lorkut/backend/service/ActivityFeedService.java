package com.lorkut.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lorkut.backend.model.ActivityFeed;
import com.lorkut.backend.repository.ActivityFeedRepository;

@Service
public class ActivityFeedService {

    private final ActivityFeedRepository activityFeedRepository;

    public ActivityFeedService(
            ActivityFeedRepository activityFeedRepository) {

        this.activityFeedRepository = activityFeedRepository;
    }

    public List<ActivityFeed> getFeed() {
        return activityFeedRepository.findAllByOrderByCreatedAtDesc();
    }

}