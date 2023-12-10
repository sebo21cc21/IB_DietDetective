package com.example.dietdetectivespring.eatenmeals;

import com.example.dietdetectivespring.meal.Meal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EatenMealsSummaryResponse {

    List<Meal> eatenMealsToday;
    List<CaloriesPerDayDto> eatenMealsFromLastWeek;
    Integer caloriesConsumedToday;
    Integer caloriesDailyDemand;
    Float carbohydratesConsumedToday;
    Float fatsConsumedToday;
    Float proteinsConsumedToday;
}
