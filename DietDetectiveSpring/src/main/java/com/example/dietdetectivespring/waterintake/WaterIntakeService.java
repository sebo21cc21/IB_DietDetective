package com.example.dietdetectivespring.waterintake;

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
public class WaterIntakeService {

    private final WaterIntakeRepository waterIntakeRepository;
    private final UserRepository userRepository;

    public List<WaterIntake> getUserWaterIntake(String email) {
        return waterIntakeRepository.findByUserEmail(email);
    }

    public WaterIntake getWaterIntakeByToday(String email) {
        return waterIntakeRepository.findByDateAndUserEmail(new Date(System.currentTimeMillis()), email)
                .orElse(WaterIntake.builder().volume(0F).build());
    }

    public WaterIntake addWaterIntake(WaterIntakeRequest waterIntake, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Optional<WaterIntake> waterIntakeDb = waterIntakeRepository.findByDateAndUserEmail(new Date(System.currentTimeMillis()), email);

        if (waterIntakeDb.isPresent()) {
            WaterIntake waterIntakeToUpdate = waterIntakeDb.get();
            waterIntakeToUpdate.setVolume(waterIntakeToUpdate.getVolume() + waterIntake.getVolume());
            return waterIntakeRepository.save(waterIntakeToUpdate);
        }

        WaterIntake newWaterIntake = WaterIntake.builder()
                .date(new Date(System.currentTimeMillis()))
                .volume(waterIntake.getVolume())
                .user(user)
                .build();
        return waterIntakeRepository.save(newWaterIntake);
    }
}
