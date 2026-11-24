package com.lorkut.backend.repository;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lorkut.backend.model.Scrap;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Integer> {

    @Override
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Scrap> findById(Integer id);

    List<Scrap> findAllByApprovedTrueOrderByCreatedAtDesc();

    List<Scrap> findAllByApprovedFalseOrderByCreatedAtDesc();
}