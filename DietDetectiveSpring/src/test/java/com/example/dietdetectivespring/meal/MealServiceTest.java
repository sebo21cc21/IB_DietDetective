package com.example.dietdetectivespring.meal;

import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Incubating;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class MealServiceTest {

    @Mock
    private MealRepository mealRepository;

    @InjectMocks
    private MealService mealService;

    @Test
    void shouldGetMealById() {
        // given
        val id = 1;
        val meal = Meal.builder()
                .id(1)
                .name("name")
                .calories(100)
                .carbohydrates(100f)
                .fats(100f)
                .proteins(100f)
                .build();
        given(mealRepository.findById(id)).willReturn(Optional.of(meal));
        // when
        val result = mealService.getMealById(id);
        // then
        assertThat(result).isEqualTo(meal);
    }

    @Test
    void shouldGetMealByIdThrowException() {
        // given
        val id = 1;
        given(mealRepository.findById(id)).willReturn(Optional.empty());
        // when
        // then
        assertThatThrownBy(() -> mealService.getMealById(id))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void shouldGetMealsByCategoryIds() {
        // given
        val categoryIds = List.of(2,3);
        val meal = Meal.builder()
                .id(1)
                .name("name")
                .calories(100)
                .carbohydrates(100f)
                .fats(100f)
                .proteins(100f)
                .build();
        given(mealRepository.findAllByCategoryIdIn(categoryIds)).willReturn(List.of(meal));
        // when
        val result = mealService.getMealsByCategoryIds(categoryIds);
        // then
        assertThat(result).isNotEmpty();
        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isEqualTo(meal);
    }
}
