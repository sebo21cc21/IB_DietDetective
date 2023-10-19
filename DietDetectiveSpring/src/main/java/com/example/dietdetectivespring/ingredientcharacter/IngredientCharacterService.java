package com.example.dietdetectivespring.ingredientcharacter;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IngredientCharacterService {

    private final IngredientCharacterRepository ingredientCharacterRepository;
    private final ModelMapper modelMapper;

    public List<IngredientCharacter> getAllIngredientCharacters() {
        return ingredientCharacterRepository.findAll();
    }

    public IngredientCharacter getIngredientCharacterById(int id) throws EntityNotFoundException {
        Optional<IngredientCharacter> found = ingredientCharacterRepository.findById(id);

        return found.orElseThrow(EntityNotFoundException::new);
    }

    public IngredientCharacter addIngredientCharacter(IngredientCharacterDto ingredientCharacterDto) {
        IngredientCharacter character = modelMapper.map(ingredientCharacterDto, IngredientCharacter.class);
        return ingredientCharacterRepository.save(character);
    }

}
