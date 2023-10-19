package com.example.dietdetectivespring.meal;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;

    public List<Meal> getAllMeals()
    {
        return mealRepository.findAll();
    }

    public Meal getMealById(int id) throws ObjectNotFoundException {
        Optional<Meal> found = mealRepository.findById(id);

        return found.orElseThrow(ObjectNotFoundException::new);
    }
}
