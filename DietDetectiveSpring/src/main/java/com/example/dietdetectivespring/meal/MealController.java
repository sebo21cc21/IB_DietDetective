package com.example.dietdetectivespring.meal;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meals")
public class MealController {

    private final MealService mealService;

    @GetMapping
    public ResponseEntity<List<Meal>> getMeals() {
        return new ResponseEntity<>(mealService.getAllMeals(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMeal(@PathVariable("id") int id) {
        try {
            return new ResponseEntity<>(mealService.getMealById(id), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Meal>> getMealsByCategoryId(@PathVariable Integer id) {
        try {
            return new ResponseEntity<>(mealService.getMealsByCategoryId(id), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
