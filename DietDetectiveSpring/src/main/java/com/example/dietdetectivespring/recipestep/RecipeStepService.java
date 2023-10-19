package com.example.dietdetectivespring.recipestep;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeStepService {
    private final RecipeStepRepository recipeStepRepository;

    @Autowired
    public RecipeStepService(RecipeStepRepository recipeStepRepository) {
        this.recipeStepRepository = recipeStepRepository;
    }

    public RecipeStep getRecipeStepById(Integer id) {
        return recipeStepRepository.findById(id).orElse(null);
    }

    public List<RecipeStep> getAllRecipeSteps() {
        return recipeStepRepository.findAll();
    }

    public RecipeStep createRecipeStep(RecipeStep recipeStep) {
        return recipeStepRepository.save(recipeStep);
    }

    public RecipeStep updateRecipeStep(Integer id, RecipeStep updatedRecipeStep) {
        RecipeStep existingRecipeStep = recipeStepRepository.findById(id).orElse(null);
        if (existingRecipeStep != null) {
            existingRecipeStep.setDescription(updatedRecipeStep.getDescription());
            existingRecipeStep.setModifiedDate(updatedRecipeStep.getModifiedDate());
            // Update other fields as needed

            return recipeStepRepository.save(existingRecipeStep);
        }
        return null;
    }

    public boolean deleteRecipeStep(Integer id) {
        if (recipeStepRepository.existsById(id)) {
            recipeStepRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
