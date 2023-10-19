package com.example.dietdetectivespring.meal;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MealController {

    private final MealService mealService;

    @GetMapping("/meals")
    public ResponseEntity<Object> getMeals(){
        return new ResponseEntity<>(mealService.getAllMeals(), HttpStatus.OK);
    }

    @GetMapping("/meals/{id}")
    public ResponseEntity<Object> getMeal(@PathVariable("id") int id) {
        try {
            return new ResponseEntity<>(mealService.getMealById(id), HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
