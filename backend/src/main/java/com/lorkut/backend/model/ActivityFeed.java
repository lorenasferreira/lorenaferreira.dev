package com.lorkut.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "activity_feed")
public class ActivityFeed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType type;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(nullable = false, columnDefinition = "json")
    private String payload;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public ActivityFeed() {
    }

    public ActivityFeed(
            ActivityType type,
            Integer userId,
            String payload,
            LocalDateTime createdAt) {
        this.type = type;
        this.userId = userId;
        this.payload = payload;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public ActivityType getType() {
        return type;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getPayload() {
        return payload;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setType(ActivityType type) {
        this.type = type;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}