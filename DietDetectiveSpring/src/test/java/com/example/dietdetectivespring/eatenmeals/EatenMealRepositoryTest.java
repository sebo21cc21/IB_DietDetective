package com.example.dietdetectivespring.eatenmeals;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Date;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class EatenMealRepositoryTest {

    @Autowired
    private EatenMealRepository eatenMealRepository;

    @Test
    void shouldFindAllByUserEmailAndDate() {
        //given
        val email = "alice@example.com";
        val date = Date.valueOf("2019-01-01");

        //when
        val eatenMeals = eatenMealRepository.findAllByUserEmailAndDate(email, date);

        //then
        assertThat(eatenMeals.size()).isEqualTo(3);
    }

    @Test
    void shouldFindByMealIdAndUserIdAndDate() {
        //given
        val userId = 1;
        val date = Date.valueOf("2019-01-01");
        val mealId = 1;

        //when
        val eatenMeal = eatenMealRepository.findByMealIdAndUserIdAndDate(mealId, userId, date);

        //then
        assertThat(eatenMeal.isPresent()).isTrue();
    }

    @Test
    void shouldCalculateCaloriesPerDayAfterDateByUserEmail() {
        //given
        val email = "alice@example.com";
        val date = Date.valueOf("2019-01-01");

        //when
        val caloriesPerDayDtos = eatenMealRepository.calculateCaloriesPerDayAfterDateByUserEmail(email, date);

        //then
        assertThat(caloriesPerDayDtos.size()).isEqualTo(9);
        assertThat(caloriesPerDayDtos.get(0).getCalories()).isEqualTo(830);
    }

}
