package com.example.dietdetectivespring.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSurveyRequest {
    private Date birthDate;
    private String sex;
    private Integer height;
    private Float targetWeight;
    private Float weight;
    private String goal;
}
