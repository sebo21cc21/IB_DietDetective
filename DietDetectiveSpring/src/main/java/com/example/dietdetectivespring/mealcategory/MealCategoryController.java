package com.example.dietdetectivespring.mealcategory;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.meal.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MealCategoryController {

    private final MealCategoryService mealCategoryService;

    @GetMapping("/mealcategory")
    public ResponseEntity<Object> getMealCategory(){
        return new ResponseEntity<>(mealCategoryService.getAllMealCategory(), HttpStatus.OK);
    }

    @GetMapping("/mealcategory/{id}")
    public ResponseEntity<Object> getMealCategory(@PathVariable("id") int id) {
        try {
            return new ResponseEntity<>(mealCategoryService.getMealCategoryById(id), HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
