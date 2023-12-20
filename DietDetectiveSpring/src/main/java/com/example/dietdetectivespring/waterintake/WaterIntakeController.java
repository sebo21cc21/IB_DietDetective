package com.example.dietdetectivespring.waterintake;

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
@RequestMapping("/water")
public class WaterIntakeController {

    private final WaterIntakeService waterIntakeService;

    @GetMapping
    public ResponseEntity<List<WaterIntake>> getWaterIntakeByUser(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(waterIntakeService.getUserWaterIntake(userDetails.getUsername()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WaterIntake> addUserWaterIntake(@RequestBody WaterIntakeRequest waterIntake, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            return new ResponseEntity<>(waterIntakeService.addWaterIntake(waterIntake, userDetails.getUsername()), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
