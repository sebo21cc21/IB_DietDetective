package com.example.dietdetectivespring.ingredientcharacter;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/ingredientcharacters")
@RequiredArgsConstructor
public class IngredientCharacterController {

    private final IngredientCharacterService ingredientCharacterService;

    @GetMapping
    public ResponseEntity<List<IngredientCharacter>> getAllCharacters() {
        return ResponseEntity.ok(ingredientCharacterService.getAllIngredientCharacters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientCharacter> getCharacterById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(ingredientCharacterService.getIngredientCharacterById(id));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "There is no ingredient character with ID: " + id, e);
        }
    }

    @PostMapping
    public ResponseEntity<?> addCharacter(@Valid @RequestBody IngredientCharacterDto character) {
        return ResponseEntity.ok(ingredientCharacterService.addIngredientCharacter(character));
    }

}
