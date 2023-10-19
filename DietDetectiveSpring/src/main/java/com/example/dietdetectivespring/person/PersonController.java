package com.example.dietdetectivespring.person;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.ingredient.Ingredient;
import com.example.dietdetectivespring.ingredient.IngredientRequest;
import com.example.dietdetectivespring.mealsubcategory.MealSubcategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @GetMapping("/person")
    public ResponseEntity<Object> getAllPerson() {
        return new ResponseEntity<>(personService.getAllPerson(), HttpStatus.OK);
    }

    @GetMapping("/person/{id}")
    public ResponseEntity<Object> getPersonById(@PathVariable("id") int id) {
        try {
            Person person = personService.getPersonById(id);
            return new ResponseEntity<>(personService.getPersonById(id), HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/person")
    public ResponseEntity<Object> createPerson(@RequestBody PersonRequest person) {
        Person createdPerson = null;
        try {
            createdPerson = personService.createPerson(person);
            return new ResponseEntity<>(createdPerson, HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/person/{id}")
    public ResponseEntity<Object> deletePerson(@PathVariable("id") int id) {
        try {
            personService.deletePerson(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ObjectNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
