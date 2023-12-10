package com.example.dietdetectivespring.weightrecords;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weight")
public class WeightRecordController {

    private final WeightRecordService weightRecordService;

    @GetMapping
    public ResponseEntity<List<WeightRecord>> getWeightRecordsByUser(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(weightRecordService.getUserWeightRecords(userDetails.getUsername()), HttpStatus.OK);
    }

    @GetMapping("/today")
    public ResponseEntity<WeightRecord> getWeightRecordByToday(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(weightRecordService.getWeightRecordByToday(userDetails.getUsername()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WeightRecord> addUserWeightRecord(@RequestBody WeightRecordRequest
                                                                    weightRecord, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            return new ResponseEntity<>(weightRecordService.addWeightRecord(weightRecord, userDetails.getUsername()), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
