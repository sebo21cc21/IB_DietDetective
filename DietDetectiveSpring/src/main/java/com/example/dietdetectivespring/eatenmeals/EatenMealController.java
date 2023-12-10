package com.example.dietdetectivespring.eatenmeals;

import com.example.dietdetectivespring.meal.Meal;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/eaten-meals")
public class EatenMealController {

    private final EatenMealsService eatenMealsService;

    @PostMapping
    public ResponseEntity<EatenMeal> addEatenMeal(@RequestBody EatenMealRequest eatenMealRequest, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            return ResponseEntity.ok(eatenMealsService.addEatenMeal(eatenMealRequest, userDetails.getUsername()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/today")
    public ResponseEntity<List<Meal>> getEatenMealsForToday(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(eatenMealsService.getEatenMealsWithoutDateForToday(userDetails.getUsername()));
    }


    @GetMapping("/summary")
    public ResponseEntity<EatenMealsSummaryResponse> getMealsSummary(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(eatenMealsService.getMealsSummary(userDetails.getUsername()), HttpStatus.OK);
    }

}
