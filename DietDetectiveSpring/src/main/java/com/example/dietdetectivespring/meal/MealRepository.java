package com.example.dietdetectivespring.meal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Integer> {
    @Query("SELECT m FROM Meal m JOIN m.categories c WHERE c.id = :categoryId")
    List<Meal> findAllByCategoryId(@Param("categoryId") Integer categoryId);

    @Query("SELECT DISTINCT m FROM Meal m JOIN m.categories c WHERE c.id IN :categoryIds")
    List<Meal> findAllByCategoryIdIn(List<Integer> categoryIds);
}