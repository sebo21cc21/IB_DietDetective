package com.example.dietdetectivespring.eatenmeals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface EatenMealRepository extends JpaRepository<EatenMeal, Integer> {
    List<EatenMeal> findAllByUserEmailAndDate(String email, Date date);

    List<EatenMeal> findAllByUserEmailAndDateAfter(String email, Date date);

    @Query("SELECT NEW com.example.dietdetectivespring.eatenmeals.CaloriesPerDayDto(SUM(em.meal.calories), em.date) " +
            "FROM EatenMeal em " +
            "WHERE em.user.email = :email AND em.date > :date " +
            "GROUP BY em.date")
    List<CaloriesPerDayDto> calculateCaloriesPerDayAfterDateByUserEmail(String email, Date date);
}
