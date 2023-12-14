package com.example.dietdetectivespring.eatenmeals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EatenMealRequest {
    private Integer mealId;
    private Integer eatenWeight;
}
