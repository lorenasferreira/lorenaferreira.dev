package com.lorkut.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lorkut.backend.model.ActivityFeed;
import com.lorkut.backend.service.ActivityFeedService;

@RestController
@RequestMapping("/api/feed")
public class ActivityFeedController {

    private final ActivityFeedService activityFeedService;

    public ActivityFeedController(
            ActivityFeedService activityFeedService) {

        this.activityFeedService = activityFeedService;
    }

    @GetMapping
    public List<ActivityFeed> getFeed() {
        return activityFeedService.getFeed();
    }

}