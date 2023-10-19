package com.example.dietdetectivespring.difficultylevel;

import com.example.dietdetectivespring.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DifficultyLevelController {
    private final DifficultyLevelService difficultyLevelService;

    @GetMapping("/difficultylevel")
    public ResponseEntity<Object> getDifficultyLevel(){
        return new ResponseEntity<>(difficultyLevelService.getAllDifficultyLevel(), HttpStatus.OK);
    }

    @GetMapping("/difficultylevel/{id}")
    public ResponseEntity<Object> getDifficultyLevelById(@PathVariable("id") int id){
        try{
            return new ResponseEntity<>(difficultyLevelService.getDifficultyLevelById(id), HttpStatus.OK);
        }
        catch (ObjectNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
