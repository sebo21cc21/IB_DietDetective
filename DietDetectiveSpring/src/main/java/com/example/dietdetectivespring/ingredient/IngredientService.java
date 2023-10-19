package com.example.dietdetectivespring.ingredient;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.ingredientcharacter.IngredientCharacter;
import com.example.dietdetectivespring.ingredientcharacter.IngredientCharacterRepository;
import com.example.dietdetectivespring.meal.Meal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final IngredientCharacterRepository ingredientCharacterRepository;
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient getIngredientById(int id) throws ObjectNotFoundException {
        Optional<Ingredient> found = ingredientRepository.findById(id);
        return found.orElseThrow(ObjectNotFoundException::new);
    }

    public Ingredient createIngredient(IngredientRequest ingredientRequest) throws ObjectNotFoundException {
        Optional<IngredientCharacter> ingredientCharacter = ingredientCharacterRepository.findById(ingredientRequest.getIdIngredientCharacter());
        if(ingredientCharacter.isEmpty())
            throw new ObjectNotFoundException();
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientCharacter(ingredientCharacter.get());
        ingredient.setName(ingredientRequest.getName());
        ingredient.setUnit(ingredientRequest.getUnit());
        ingredient.setAmountOfCalories(ingredientRequest.getAmountOfCalories());
        ingredient.setAmountOfCarbohydrates(ingredientRequest.getAmountOfCarbohydrates());
        ingredient.setAmountOfProteins(ingredientRequest.getAmountOfProteins());
        ingredient.setAmountOfFats(ingredientRequest.getAmountOfFats());
        return ingredientRepository.save(ingredient);
    }

    public Ingredient updateIngredient(int id, Ingredient updatedIngredient) throws ObjectNotFoundException {
        Ingredient ingredient = getIngredientById(id);

        // Aktualizacja pól
        ingredient.setName(updatedIngredient.getName());
        ingredient.setUnit(updatedIngredient.getUnit());

        // Aktualizacja relacji z charakterem składnika
        Optional<IngredientCharacter> ingredientCharacter = ingredientCharacterRepository.findById(updatedIngredient.getIngredientCharacter().getId());
        if (ingredientCharacter.isEmpty()) {
            throw new ObjectNotFoundException("Ingredient Character not found.");
        }
        ingredient.setIngredientCharacter(ingredientCharacter.get());

        return ingredientRepository.save(ingredient);
    }
    public void deleteIngredient(int id) throws ObjectNotFoundException {
        Ingredient ingredient = getIngredientById(id);

        // Usunięcie składnika z posiłków, w których się znajduje
        List<Meal> meals = ingredient.getMeals();
        for (Meal meal : meals) {
            meal.getIngredients().remove(ingredient);
        }

        ingredientRepository.delete(ingredient);
    }
}
