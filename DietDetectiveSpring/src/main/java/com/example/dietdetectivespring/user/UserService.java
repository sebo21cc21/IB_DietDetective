package com.example.dietdetectivespring.user;

import com.example.dietdetectivespring.eatenmeals.EatenMealsService;
import com.example.dietdetectivespring.utils.BMRCalculator;
import com.example.dietdetectivespring.waterintake.WaterIntakeService;
import com.example.dietdetectivespring.weightrecords.WeightRecord;
import com.example.dietdetectivespring.weightrecords.WeightRecordRequest;
import com.example.dietdetectivespring.weightrecords.WeightRecordService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.example.dietdetectivespring.utils.Constants.WATER_DEMAND;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final WeightRecordService weightRecordService;
    private final WaterIntakeService waterIntakeService;
    private final EatenMealsService eatenMealsService;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
    }

    public User updateUserGoal(UserGoalRequest userGoalRequest, String email) {
        User user = getUserByEmail(email);
        user.setGoal(userGoalRequest.getGoal());
        return userRepository.save(user);
    }

    public User updateUserTarget(UserTargetRequest userTargetRequest, String email) {
        User user = getUserByEmail(email);
        user.setTargetWeight(userTargetRequest.getTargetWeight());
        return userRepository.save(user);
    }

    public User updateUserPremium(UserPremiumRequest userPremiumRequest, String email) {
        User user = getUserByEmail(email);
        user.setPremium(userPremiumRequest.getPremium());
        return userRepository.save(user);
    }

    public User updateUserSurvey(UserSurveyRequest userSurveyRequest, String email) {
        User user = getUserByEmail(email);
        user.setSurvey(userSurveyRequest);
        weightRecordService.addWeightRecord(new WeightRecordRequest(userSurveyRequest.getWeight()), email);
        return userRepository.save(user);
    }

    public int getCaloriesDemand(String email) {
        User user = getUserByEmail(email);
        WeightRecord weightRecordByToday = weightRecordService.getWeightRecordByToday(email);
        return BMRCalculator.calculateBMR(
                user.getSex(),
                weightRecordByToday.getWeight(),
                user.getHeight(),
                user.getBirthDate());
    }

    public UserSummaryResponse getUserStats(String email) {

        float caloriesDemand = getCaloriesDemand(email);
        float caloriesForToday = eatenMealsService.getCaloriesConsumedForToday(email);

        return UserSummaryResponse.builder()
                .caloriesDemand(caloriesDemand)
                .caloriesConsumedToday(caloriesForToday)
                .caloriesLeftToday(Math.max((caloriesDemand - caloriesForToday), 0))
                .todayWeight(weightRecordService.getWeightRecordByToday(email).getWeight())
                .targetWeight(getUserByEmail(email).getTargetWeight())
                .waterToday(waterIntakeService.getWaterIntakeByToday(email).getVolume())
                .waterDemand(WATER_DEMAND)
                .weightRecords(weightRecordService.getUserWeightRecords(email))
                .build();
    }

}
