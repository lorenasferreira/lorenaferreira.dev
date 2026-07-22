package com.lorkut.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lorkut.backend.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    List<Project> findAllByOrderByCreatedAtAsc();

    Optional<Project> findBySlug(String slug);
}