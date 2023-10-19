package com.example.dietdetectivespring.person;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PersonRequest {
    private String name;
    private String surname;
    private LocalDate dateOfBirth;
    private String gender;
    private Double height;
    private Double weight;
    private Double estimated_weight;

}
