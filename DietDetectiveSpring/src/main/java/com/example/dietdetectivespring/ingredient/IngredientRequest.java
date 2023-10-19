package com.example.dietdetectivespring.ingredient;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class IngredientRequest {
    private Integer idIngredientCharacter;
    private String name;
    private String unit;
    private Double amountOfCalories;
    private Double amountOfCarbohydrates;
    private Double amountOfProteins;
    private Double amountOfFats;

}
