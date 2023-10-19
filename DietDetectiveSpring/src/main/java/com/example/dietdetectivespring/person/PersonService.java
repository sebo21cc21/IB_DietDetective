package com.example.dietdetectivespring.person;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.ingredient.Ingredient;
import com.example.dietdetectivespring.ingredient.IngredientRequest;
import com.example.dietdetectivespring.ingredientcharacter.IngredientCharacter;
import com.example.dietdetectivespring.meal.Meal;
import com.example.dietdetectivespring.mealsubcategory.MealSubcategory;
import com.example.dietdetectivespring.mealsubcategory.MealSubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository personRepository;

    public List<Person> getAllPerson()
    {
        return personRepository.findAll();
    }

    public Person getPersonById(int id) throws ObjectNotFoundException {
        Optional<Person> found = personRepository.findById(id);

        return found.orElseThrow(ObjectNotFoundException::new);
    }

    public Person createPerson(PersonRequest personRequest) throws ObjectNotFoundException {
        Person person = new Person();
        person.setName(personRequest.getName());
        person.setSurname(personRequest.getSurname());
        person.setDateOfBirth(personRequest.getDateOfBirth());
        person.setGender(personRequest.getGender());
        person.setHeight(personRequest.getHeight());
        person.setWeight(personRequest.getWeight());
        person.setEstimated_weight(personRequest.getEstimated_weight());
        person.setModifiedDate(LocalDateTime.now());
        return personRepository.save(person);
    }

    public void deletePerson(int id) throws ObjectNotFoundException {
        Person person = getPersonById(id);

        personRepository.delete(person);
    }
}
