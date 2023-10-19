package com.example.dietdetectivespring.ingredient;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;

    @GetMapping("/ingredient")
    public ResponseEntity<Object> getAllIngredients() {
        return new ResponseEntity<>(ingredientService.getAllIngredients(), HttpStatus.OK);
    }

    @GetMapping("/ingredient/{id}")
    public ResponseEntity<Object> getIngredientById(@PathVariable("id") int id) {
        try {
            Ingredient ingredient = ingredientService.getIngredientById(id);
            return new ResponseEntity<>(ingredient, HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/ingredient")
    public ResponseEntity<Object> createIngredient(@RequestBody IngredientRequest ingredient) {
        Ingredient createdIngredient = null;
        try {
            createdIngredient = ingredientService.createIngredient(ingredient);
            return new ResponseEntity<>(ingredient, HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/ingredient/{id}")
    public ResponseEntity<Object> updateIngredient(@PathVariable("id") int id, @RequestBody Ingredient ingredient) {
        try {
            Ingredient updatedIngredient = ingredientService.updateIngredient(id, ingredient);
            return new ResponseEntity<>(updatedIngredient, HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/ingredient/{id}")
    public ResponseEntity<Object> deleteIngredient(@PathVariable("id") int id) {
        try {
            ingredientService.deleteIngredient(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
