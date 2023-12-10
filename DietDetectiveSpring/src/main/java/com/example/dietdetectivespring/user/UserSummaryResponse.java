package com.example.dietdetectivespring.user;

import com.example.dietdetectivespring.weightrecords.WeightRecord;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSummaryResponse {
    private Integer caloriesDemand;
    private Integer caloriesConsumedToday;
    private Integer caloriesLeftToday;
    private Float todayWeight;
    private Float targetWeight;
    private Float waterToday;
    private Float waterDemand;
    private List<WeightRecord> weightRecords;
}
