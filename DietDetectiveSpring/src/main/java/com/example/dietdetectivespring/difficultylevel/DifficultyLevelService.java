package com.example.dietdetectivespring.difficultylevel;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DifficultyLevelService {
    private final DifficultyLevelRepository difficultyLevelRepository;

    public List<DifficultyLevel> getAllDifficultyLevel() {return difficultyLevelRepository.findAll();}

    public DifficultyLevel getDifficultyLevelById(int id) throws ObjectNotFoundException {
        Optional<DifficultyLevel> found = difficultyLevelRepository.findById(id);
        return found.orElseThrow(ObjectNotFoundException::new);
    }

}
