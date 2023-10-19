package com.example.dietdetectivespring.ingredientcharacter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngredientCharacterDto {
    @NotBlank(message = "Name of the ingredient character is mandatory")
    @Size(max = 50, message = "Maximum length of the ingredient character is 50 characters")
    private String name;
}
