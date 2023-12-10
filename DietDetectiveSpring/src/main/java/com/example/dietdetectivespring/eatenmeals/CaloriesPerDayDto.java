package com.example.dietdetectivespring.eatenmeals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CaloriesPerDayDto {
    private Long calories;
    private Date date;
}
