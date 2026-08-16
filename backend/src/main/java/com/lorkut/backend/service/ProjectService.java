package com.lorkut.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lorkut.backend.model.ActivityType;
import com.lorkut.backend.model.Project;
import com.lorkut.backend.repository.ProjectRepository;

import tools.jackson.databind.json.JsonMapper;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ActivityFeedService activityFeedService;
    private final JsonMapper jsonMapper;

    public ProjectService(
            ProjectRepository projectRepository,
            ActivityFeedService activityFeedService,
            JsonMapper jsonMapper) {

        this.projectRepository = projectRepository;
        this.activityFeedService = activityFeedService;
        this.jsonMapper = jsonMapper;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtAsc();
    }

    public Optional<Project> getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug);
    }

    public Project createProject(Project project) {
        Project savedProject = projectRepository.save(project);

        Map<String, Object> feedPayload = Map.of(
                "projectId", savedProject.getId(),
                "slug", savedProject.getSlug());

        String payload = jsonMapper.writeValueAsString(feedPayload);

        activityFeedService.createActivity(
                ActivityType.new_project,
                1,
                payload);

        return savedProject;
    }
}