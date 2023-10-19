package com.example.dietdetectivespring.country;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import com.example.dietdetectivespring.meal.Meal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountryService {

    private final CountryRepository countryRepository;
    public List<Country> getAllCountry()
    {
        return countryRepository.findAll();
    }

    public Country getCountryById(int id) throws ObjectNotFoundException {
        Optional<Country> found = countryRepository.findById(id);

        return found.orElseThrow(ObjectNotFoundException::new);
    }

}
