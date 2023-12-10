package com.example.dietdetectivespring.eatenmeals;

import com.example.dietdetectivespring.meal.Meal;
import com.example.dietdetectivespring.meal.MealService;
import com.example.dietdetectivespring.user.User;
import com.example.dietdetectivespring.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class EatenMealServiceTest {

    @Mock
    private EatenMealRepository eatenMealRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private MealService mealService;
    @InjectMocks
    private EatenMealsService eatenMealsService;

    @Test
    void shouldAddEatenMeal() {
        // given
        val eatenMealRequest = EatenMealRequest.builder()
                .mealId(1)
                .build();
        val meal = Meal.builder()
                .id(1)
                .calories(100)
                .build();
        val email = "email";
        val userByEmail = User.builder()
                .id(1)
                .email(email)
                .build();

        given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(userByEmail));
        given(mealService.getMealById(eatenMealRequest.getMealId())).willReturn(meal);

        // when
        eatenMealsService.addEatenMeal(eatenMealRequest, email);

        // then
        verify(eatenMealRepository, times(1)).save(any());
    }

    @Test
    void shouldNotAddEatenMealWhenUserNotFound() {
        // given
        val eatenMealRequest = EatenMealRequest.builder()
                .mealId(1)
                .build();
        val email = "email";


        given(userRepository.findByEmail(email)).willReturn(Optional.empty());
        // when

        assertThatThrownBy(() -> eatenMealsService.addEatenMeal(eatenMealRequest, email))
                .isInstanceOf(EntityNotFoundException.class);

        // then
        verify(eatenMealRepository, times(0)).save(any());
    }

    @Test
    void shouldNotAddEatenMealWhenMealNotFound() {
        // given
        val eatenMealRequest = EatenMealRequest.builder()
                .mealId(1)
                .build();
        val email = "email";
        val userByEmail = User.builder()
                .id(1)
                .email(email)
                .build();

        given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(userByEmail));
        given(mealService.getMealById(eatenMealRequest.getMealId())).willThrow(EntityNotFoundException.class);

        // when
        assertThatThrownBy(() -> eatenMealsService.addEatenMeal(eatenMealRequest, email))
                .isInstanceOf(EntityNotFoundException.class);
        // then
        verify(eatenMealRepository, times(0)).save(any());
    }
}
