package com.lorkut.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lorkut.backend.model.Project;
import com.lorkut.backend.repository.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtAsc();
    }

    public Optional<Project> getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug);
    }
}