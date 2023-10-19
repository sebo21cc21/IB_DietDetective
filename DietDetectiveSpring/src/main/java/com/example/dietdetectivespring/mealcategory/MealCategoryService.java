package com.example.dietdetectivespring.mealcategory;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.meal.Meal;
import com.example.dietdetectivespring.meal.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class MealCategoryService {
    private final MealCategoryRepository mealCategoryRepository;

    public List<MealCategory> getAllMealCategory()
    {
        return mealCategoryRepository.findAll();
    }

    public MealCategory getMealCategoryById(int id) throws ObjectNotFoundException {
        Optional<MealCategory> found = mealCategoryRepository.findById(id);

        return found.orElseThrow(ObjectNotFoundException::new);
    }
}
