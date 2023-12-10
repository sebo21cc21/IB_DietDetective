package com.example.dietdetectivespring.waterintake;

import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Integer> {
    List<WaterIntake> findByUserEmail(String email);

    Optional<WaterIntake> findByDateAndUserEmail(Date date, String email);
}