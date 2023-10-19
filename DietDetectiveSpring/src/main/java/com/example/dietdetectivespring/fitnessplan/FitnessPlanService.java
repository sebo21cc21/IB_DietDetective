package com.example.dietdetectivespring.fitnessplan;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class FitnessPlanService {

    private final FitnessPlanRepository fitnessPlanRepository;

    public List<FitnessPlan> getAllFitnessPlan() {return fitnessPlanRepository.findAll();}

    public FitnessPlan getFitnessPlanById(int id) throws ObjectNotFoundException {
        Optional<FitnessPlan> found = fitnessPlanRepository.findById(id);
        return found.orElseThrow(ObjectNotFoundException::new);
    }
}
