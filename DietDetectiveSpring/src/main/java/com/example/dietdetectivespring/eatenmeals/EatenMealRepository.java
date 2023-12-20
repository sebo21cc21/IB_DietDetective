package com.example.dietdetectivespring.eatenmeals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface EatenMealRepository extends JpaRepository<EatenMeal, Integer> {
    List<EatenMeal> findAllByUserEmailAndDate(String email, Date date);

    Optional<EatenMeal> findByMealIdAndUserIdAndDate(Integer mealId, Integer userId, Date date);

    @Query("SELECT NEW com.example.dietdetectivespring.eatenmeals.CaloriesPerDayDto(CAST(SUM(em.meal.calories * (CAST(em.eatenWeight AS double) / 100.0)) AS long), em.date) " +
            "FROM EatenMeal em " +
            "WHERE em.user.email = :email AND em.date > :date " +
            "GROUP BY em.date")
    List<CaloriesPerDayDto> calculateCaloriesPerDayAfterDateByUserEmail(String email, Date date);

}
