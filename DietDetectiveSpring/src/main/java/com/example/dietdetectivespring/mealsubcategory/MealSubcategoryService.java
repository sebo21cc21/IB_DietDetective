package com.example.dietdetectivespring.mealsubcategory;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.mealcategory.MealCategory;
import com.example.dietdetectivespring.mealcategory.MealCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealSubcategoryService {
    private final MealSubcategoryRepository mealSubcategoryRepository;

    public List<MealSubcategory> getAllMealSubcategory()
    {
        return mealSubcategoryRepository.findAll();
    }

    public MealSubcategory getMealSubcategoryById(int id) throws ObjectNotFoundException {
        Optional<MealSubcategory> found = mealSubcategoryRepository.findById(id);

        return found.orElseThrow(ObjectNotFoundException::new);
    }
}
