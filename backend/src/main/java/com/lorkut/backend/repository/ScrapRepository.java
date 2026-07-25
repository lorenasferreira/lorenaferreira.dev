package com.lorkut.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lorkut.backend.model.Scrap;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Integer> {

    List<Scrap> findAllByApprovedTrueOrderByCreatedAtDesc();

    List<Scrap> findAllByApprovedFalseOrderByCreatedAtDesc();
}