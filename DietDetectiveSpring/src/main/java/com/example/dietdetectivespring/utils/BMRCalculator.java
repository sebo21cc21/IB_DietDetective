package com.example.dietdetectivespring.utils;

import java.sql.Date;
import java.time.LocalDate;

public class BMRCalculator {

    public static int calculateBMR(String gender, float weight, float height, Date birthDate) {
        int BMR = 0;
        int age = calculateAge(birthDate);
        if (isMale(gender)) {
            BMR = (int) Math.floor(66 + (13.7 * weight) + (5 * height) - (6.8 * age));
        } else if (isFemale(gender)) {
            BMR = (int) Math.floor(655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
        }

        return BMR;
    }

    private static int calculateAge(Date birthDate) {
        LocalDate currentDate = LocalDate.now();
        LocalDate birthLocalDate = birthDate.toLocalDate();
        return currentDate.getYear() - birthLocalDate.getYear();
    }

    private static boolean isMale(String gender) {
        return gender != null && (gender.equals("M") || gender.equals("Mężczyzna") || gender.equals("Mezczyzna") || gender.equals("Chlopak"));
    }

    private static boolean isFemale(String gender) {
        return gender != null && (gender.equals("K") || gender.equals("D") || gender.equals("Kobieta") || gender.equals("Dziewczyna"));
    }

}
