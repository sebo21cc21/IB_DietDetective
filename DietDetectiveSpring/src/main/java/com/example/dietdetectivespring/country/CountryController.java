package com.example.dietdetectivespring.country;

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
public class CountryController {

    private final CountryService countryService;

    @GetMapping("/country")
    public ResponseEntity<Object> getCountry(){
        return new ResponseEntity<>(countryService.getAllCountry(), HttpStatus.OK);
    }

    @GetMapping("/country/{id}")
    public ResponseEntity<Object> getCountry(@PathVariable("id") int id) {
        try {
            return new ResponseEntity<>(countryService.getCountryById(id), HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
