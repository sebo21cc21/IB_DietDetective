package com.example.dietdetectivespring.meal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class MealRepositoryTest {

    @Autowired
    private MealRepository mealRepository;

    @Test
    void shouldFindAllByCategoryIdIn() {
        // given
        var categoryIds = List.of(2,3);
        // when
        var meals = mealRepository.findAllByCategoryIdIn(categoryIds);
        // then
        assertThat(meals).isNotEmpty();
        assertThat(meals).hasSize(4);
    }
}
