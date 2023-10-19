package com.example.dietdetectivespring.mealsubcategory;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.mealcategory.MealCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MealSubcategoryController {
    private final MealSubcategoryService mealSubcategoryService;

    @GetMapping("/mealsubcategory")
    public ResponseEntity<Object> getMealCategory(){
        return new ResponseEntity<>(mealSubcategoryService.getAllMealSubcategory(), HttpStatus.OK);
    }

    @GetMapping("/mealsubcategory/{id}")
    public ResponseEntity<Object> getMealSubcategory(@PathVariable("id") int id) {
        try {
            return new ResponseEntity<>(mealSubcategoryService.getMealSubcategoryById(id), HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
