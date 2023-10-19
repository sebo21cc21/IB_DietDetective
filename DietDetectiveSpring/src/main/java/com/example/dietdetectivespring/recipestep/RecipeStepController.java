package com.example.dietdetectivespring.recipestep;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipestep")
public class RecipeStepController {
    private final RecipeStepService recipeStepService;

    @Autowired
    public RecipeStepController(RecipeStepService recipeStepService) {
        this.recipeStepService = recipeStepService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeStep> getRecipeStepById(@PathVariable Integer id) {
        RecipeStep recipeStep = recipeStepService.getRecipeStepById(id);
        if (recipeStep != null) {
            return ResponseEntity.ok(recipeStep);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<RecipeStep>> getAllRecipeSteps() {
        List<RecipeStep> recipeSteps = recipeStepService.getAllRecipeSteps();
        return ResponseEntity.ok(recipeSteps);
    }

    @PostMapping
    public ResponseEntity<RecipeStep> createRecipeStep(@RequestBody RecipeStep recipeStep) {
        RecipeStep createdRecipeStep = recipeStepService.createRecipeStep(recipeStep);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecipeStep);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeStep> updateRecipeStep(
            @PathVariable Integer id, @RequestBody RecipeStep recipeStep) {
        RecipeStep updatedRecipeStep = recipeStepService.updateRecipeStep(id, recipeStep);
        if (updatedRecipeStep != null) {
            return ResponseEntity.ok(updatedRecipeStep);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipeStep(@PathVariable Integer id) {
        boolean deleted = recipeStepService.deleteRecipeStep(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
