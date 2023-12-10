package com.example.dietdetectivespring.weightrecords;

import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface WeightRecordRepository extends JpaRepository<WeightRecord, Integer> {
    List<WeightRecord> findByUserEmail(String email);

    Optional<WeightRecord> findByDateAndUserEmail(Date date, String email);
}