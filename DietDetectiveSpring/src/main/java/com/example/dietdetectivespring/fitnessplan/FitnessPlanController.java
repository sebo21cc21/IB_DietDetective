package com.example.dietdetectivespring.fitnessplan;

import com.example.dietdetectivespring.fitnessplan.FitnessPlanService;
import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FitnessPlanController {
    private final FitnessPlanService fitnessPlanService;

    @GetMapping("/fitnessplan")
    public ResponseEntity<Object> getDifficultyLevel(){
        return new ResponseEntity<>(fitnessPlanService.getAllFitnessPlan(), HttpStatus.OK);
    }

    @GetMapping("/fitnessplan/{id}")
    public ResponseEntity<Object> getFitnessPlanById(@PathVariable("id") int id){
        try{
            return new ResponseEntity<>(fitnessPlanService.getFitnessPlanById(id), HttpStatus.OK);
        }
        catch (ObjectNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
