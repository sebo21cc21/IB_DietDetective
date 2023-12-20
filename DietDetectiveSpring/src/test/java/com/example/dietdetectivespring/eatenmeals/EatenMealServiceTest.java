package com.example.dietdetectivespring.eatenmeals;

import com.example.dietdetectivespring.meal.Meal;
import com.example.dietdetectivespring.meal.MealService;
import com.example.dietdetectivespring.user.User;
import com.example.dietdetectivespring.user.UserRepository;
import com.example.dietdetectivespring.weightrecords.WeightRecord;
import com.example.dietdetectivespring.weightrecords.WeightRecordService;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
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
    @Mock
    private WeightRecordService weightRecordService;
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

    @Test
    void shouldGetEatenMealsForToday() {
        // given
        val email = "email";
        val date = Date.valueOf("2019-01-01");
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .date(date)
                        .build(),
                EatenMeal.builder()
                        .date(date)
                        .build()
        );

        given(eatenMealRepository.findAllByUserEmailAndDate(eq(email), any())).willReturn(eatenMealsList);

        // when
        List<EatenMeal> eatenMealsForToday = eatenMealsService.getEatenMealsForToday(email);

        // then
        assertThat(eatenMealsForToday.size()).isEqualTo(2);
    }

    @Test
    void shouldGetEatenMealsWithoutDateForToday() {
        // given
        val email = "email";
        val date = Date.valueOf("2019-01-01");
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .date(date)
                        .build()
        );

        given(eatenMealRepository.findAllByUserEmailAndDate(eq(email), any())).willReturn(eatenMealsList);

        // when
        List<EatenMeal> eatenMealsForToday = eatenMealsService.getEatenMealsWithoutDateForToday(email);

        // then
        assertThat(eatenMealsForToday.size()).isEqualTo(1);
        assertThat(eatenMealsForToday.get(0).getMeal().getCalories()).isEqualTo(200);
    }

    @Test
    void shouldGetEatenMealsWithoutDate() {
        // given
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .build()
        );

        // when
        List<Meal> eatenMealsWithoutDate = eatenMealsService.getEatenMealsWithoutDate(eatenMealsList);

        // then
        assertThat(eatenMealsWithoutDate.size()).isEqualTo(1);
        assertThat(eatenMealsWithoutDate.get(0).getCalories()).isEqualTo(100);
    }

    @Test
    void shouldGetCaloriesConsumedForToday() {
        // given
        val email = "email";
        val date = Date.valueOf("2019-01-01");
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .date(date)
                        .build()
        );

        given(eatenMealRepository.findAllByUserEmailAndDate(eq(email), any())).willReturn(eatenMealsList);

        // when
        Integer caloriesConsumedForToday = eatenMealsService.getCaloriesConsumedForToday(email);

        // then
        assertThat(caloriesConsumedForToday).isEqualTo(100);
    }

    @Test
    void shouldGetCaloriesPerDayFromLastWeek() {
        // given
        val email = "email";
        val date = Date.valueOf("2019-01-01");
        val caloriesPerDayDtoList = List.of(
                CaloriesPerDayDto.builder()
                        .calories(100L)
                        .build()
        );

        given(eatenMealRepository.calculateCaloriesPerDayAfterDateByUserEmail(eq(email), any())).willReturn(caloriesPerDayDtoList);

        // when
        List<CaloriesPerDayDto> caloriesPerDayFromLastWeek = eatenMealsService.getCaloriesPerDayFromLastWeek(email);

        // then
        assertThat(caloriesPerDayFromLastWeek.size()).isEqualTo(1);
        assertThat(caloriesPerDayFromLastWeek.get(0).getCalories()).isEqualTo(100);
    }

    @Test
    void shouldGetCaloriesConsumed() {
        // given
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .build()
        );

        // when
        Integer caloriesConsumed = eatenMealsService.getCaloriesConsumed(eatenMealsList);

        // then
        assertThat(caloriesConsumed).isEqualTo(100);
    }

    @Test
    void shouldGetCarbohydratesConsumed() {
        // given
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .build()
        );

        // when
        Float carbohydratesConsumed = eatenMealsService.getCarbohydratesConsumed(eatenMealsList);

        // then
        assertThat(carbohydratesConsumed).isEqualTo(100);
    }

    @Test
    void shouldGetProteinsConsumed() {
        // given
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .build()
        );

        // when
        Float proteinsConsumed = eatenMealsService.getProteinsConsumed(eatenMealsList);

        // then
        assertThat(proteinsConsumed).isEqualTo(100);
    }

    @Test
    void shouldGetFatsConsumed() {
        // given
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .build()
        );

        // when
        Float fatsConsumed = eatenMealsService.getFatsConsumed(eatenMealsList);

        // then
        assertThat(fatsConsumed).isEqualTo(100);
    }

    @Test
    void shouldGetCaloriesDemand() {
        // given
        val user = User.builder()
                .email("email")
                .height(100)
                .sex("Kobieta")
                .birthDate(Date.valueOf("1990-01-01"))
                .build();
        val weightRecord = WeightRecord.builder()
                .weight(100F)
                .build();
        given(userRepository.findByEmail("email")).willReturn(Optional.of(user));
        given(weightRecordService.getWeightRecordByToday("email")).willReturn(weightRecord);
        // when
        Integer caloriesDemand = eatenMealsService.getCaloriesDemand("email");

        // then
        assertThat(caloriesDemand).isEqualTo(1639);
    }

    @Test
    void deleteEatenMeal() {
        // given
        val email = "email";
        val eatenMeal = EatenMeal.builder()
                .id(1)
                .build();
        val user = User.builder()
                .id(1)
                .email(email)
                .build();

        given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(user));
        given(eatenMealRepository.findByMealIdAndUserIdAndDate(eq(eatenMeal.getId()), eq(user.getId()), any())).willReturn(Optional.ofNullable(eatenMeal));

        // when
        eatenMealsService.deleteEatenMeal(eatenMeal.getId(), email);

        // then
        verify(eatenMealRepository, times(1)).delete(eatenMeal);
    }

    @Test
    void shouldNotDeleteEatenMealWhenUserNotFound() {
        // given
        val email = "email";
        val eatenMeal = EatenMeal.builder()
                .id(1)
                .build();

        given(userRepository.findByEmail(email)).willReturn(Optional.empty());

        // when
        assertThatThrownBy(() -> eatenMealsService.deleteEatenMeal(eatenMeal.getId(), email))
                .isInstanceOf(EntityNotFoundException.class);

        // then
        verify(eatenMealRepository, times(0)).delete(eatenMeal);
    }

    @Test
    void shouldGetMealsSummary() {
        // given
        val email = "email";
        val date = Date.valueOf("2019-01-01");
        val eatenMealsList = List.of(
                EatenMeal.builder()
                        .eatenWeight(200)
                        .meal(Meal.builder()
                                .calories(100)
                                .proteins(100f)
                                .carbohydrates(100f)
                                .fats(100f)
                                .build())
                        .date(date)
                        .build()
        );
        val user = User.builder()
                .email("email")
                .height(100)
                .sex("Kobieta")
                .birthDate(Date.valueOf("1990-01-01"))
                .build();
        val weightRecord = WeightRecord.builder()
                .weight(100F)
                .build();

        val caloriesPerDayDtos = List.of(CaloriesPerDayDto.builder().calories(100L).build());

        given(userRepository.findByEmail(email)).willReturn(Optional.ofNullable(user));
        given(eatenMealRepository.findAllByUserEmailAndDate(eq(email), any())).willReturn(eatenMealsList);
        given(eatenMealRepository.calculateCaloriesPerDayAfterDateByUserEmail(eq(email), any())).willReturn(caloriesPerDayDtos);
        given(weightRecordService.getWeightRecordByToday(email)).willReturn(weightRecord);

        // when
        EatenMealsSummaryResponse mealsSummary = eatenMealsService.getMealsSummary(email);

        // then
        assertThat(mealsSummary.getEatenMealsToday().size()).isEqualTo(1);
        assertThat(mealsSummary.getEatenMealsFromLastWeek().size()).isEqualTo(1);
        assertThat(mealsSummary.getCaloriesConsumedToday()).isEqualTo(200);
        assertThat(mealsSummary.getCaloriesDailyDemand()).isEqualTo(1639);
        assertThat(mealsSummary.getCarbohydratesConsumedToday()).isEqualTo(200);
        assertThat(mealsSummary.getFatsConsumedToday()).isEqualTo(200);
        assertThat(mealsSummary.getProteinsConsumedToday()).isEqualTo(200);
    }

}
