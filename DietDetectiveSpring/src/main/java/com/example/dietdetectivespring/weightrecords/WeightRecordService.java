package com.example.dietdetectivespring.weightrecords;

import com.example.dietdetectivespring.user.User;
import com.example.dietdetectivespring.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WeightRecordService {

    private final WeightRecordRepository weightRecordRepository;
    private final UserRepository userRepository;

    public List<WeightRecord> getUserWeightRecords(String email) {
        return weightRecordRepository.findByUserEmail(email);
    }

    public WeightRecord getWeightRecordByToday(String email) {
        return weightRecordRepository.findByDateAndUserEmail(new Date(System.currentTimeMillis()), email)
                .orElse(WeightRecord.builder().weight(0F).build());
    }

    public WeightRecord addWeightRecord(WeightRecordRequest weightRecord, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not found"));

        Optional<WeightRecord> weightRecordDb = weightRecordRepository.findByDateAndUserEmail(new Date(System.currentTimeMillis()), email);

        if (weightRecordDb.isPresent()) {
            WeightRecord weightRecordToUpdate = weightRecordDb.get();
            weightRecordToUpdate.setWeight(weightRecord.getWeight());
            return weightRecordRepository.save(weightRecordToUpdate);
        }


        WeightRecord newWeightRecord = WeightRecord.builder()
                .date(new Date(System.currentTimeMillis()))
                .weight(weightRecord.getWeight())
                .user(user)
                .build();
        return weightRecordRepository.save(newWeightRecord);
    }
}
