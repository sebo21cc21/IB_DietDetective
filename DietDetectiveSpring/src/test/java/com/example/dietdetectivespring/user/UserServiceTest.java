package com.example.dietdetectivespring.user;

import com.example.dietdetectivespring.eatenmeals.EatenMealsService;
import com.example.dietdetectivespring.waterintake.WaterIntake;
import com.example.dietdetectivespring.waterintake.WaterIntakeService;
import com.example.dietdetectivespring.weightrecords.WeightRecord;
import com.example.dietdetectivespring.weightrecords.WeightRecordService;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private WeightRecordService weightRecordService;
    @Mock
    private WaterIntakeService waterIntakeService;
    @Mock
    private EatenMealsService eatenMealsService;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldGetUserByEmail() {
        // given
        val email = "email";
        val user = User.
                builder().
                email(email).
                build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        // when
        User userByEmail = userService.getUserByEmail(email);
        // then
        assertThat(userByEmail.getEmail()).isEqualTo(email);
    }

    @Test
    void shouldNotGetUserByEmail() {
        // given
        val email = "email";
        given(userRepository.findByEmail(email)).willReturn(Optional.empty());
        // when
        // then
        assertThatThrownBy(() -> userService.getUserByEmail(email))
                .isInstanceOf(EntityNotFoundException.class);

    }

    @Test
    void shouldUpdateUserGoal() {
        // given
        val email = "email";
        val userGoalRequest = UserGoalRequest.builder().goal("goal").build();
        val user = User.
                builder().
                goal("goal").
                build();
        val oldUser = User.
                builder().
                goal("oldGoal").
                build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(oldUser));
        given(userRepository.save(any())).willReturn(user);
        // when
        User userByEmail = userService.updateUserGoal(userGoalRequest, email);
        // then
        assertThat(userByEmail.getGoal()).isEqualTo(userGoalRequest.getGoal());
    }

    @Test
    void shouldUpdateUserTarget() {
        // given
        val email = "email";
        val userTargetRequest = UserTargetRequest.builder().targetWeight(200f).build();
        val user = User.
                builder().
                targetWeight(200f).
                build();
        val oldUser = User.
                builder().
                targetWeight(100f).
                build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(oldUser));
        given(userRepository.save(any())).willReturn(user);
        // when
        User userByEmail = userService.updateUserTarget(userTargetRequest, email);
        // then
        assertThat(userByEmail.getTargetWeight()).isEqualTo(userTargetRequest.getTargetWeight());
    }

    @Test
    void shouldUpdateUserPremium() {
        // given
        val email = "email";
        val userPremiumRequest = UserPremiumRequest.builder().premium(true).build();
        val user = User.
                builder().
                premium(true).
                build();
        val oldUser = User.
                builder().
                premium(false).
                build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(oldUser));
        given(userRepository.save(any())).willReturn(user);
        // when
        User userByEmail = userService.updateUserPremium(userPremiumRequest, email);
        // then
        assertThat(userByEmail.getPremium()).isEqualTo(userPremiumRequest.getPremium());
    }

    @Test
    void shouldUpdateUserSurvey() {
        // given
        val email = "email";
        val userSurveyRequest = UserSurveyRequest.builder()
                .height(200)
                .weight(100f)
                .build();
        val user = User
                .builder()
                .height(200)
                .build();
        val oldUser = User
                .builder()
                .height(100)
                .build();
        val weightRecord = WeightRecord.
                builder().
                weight(100f).
                build();

        given(userRepository.findByEmail(email)).willReturn(Optional.of(oldUser));
        given(userRepository.save(any())).willReturn(user);
        given(weightRecordService.addWeightRecord(any(), any())).willReturn(weightRecord);
        // when
        User userByEmail = userService.updateUserSurvey(userSurveyRequest, email);
        // then
        assertThat(userByEmail.getHeight()).isEqualTo(userSurveyRequest.getHeight());
    }

    @Test
    void getCaloriesDemand() {
        val user = User
                .builder()
                .height(175)
                .birthDate(Date.valueOf("2000-01-01"))
                .sex("M")
                .build();
        val email = "email";
        val weightRecord = WeightRecord.
                builder().
                weight(75f).
                build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(weightRecordService.getWeightRecordByToday(email)).willReturn(weightRecord);
        // when
        int caloriesDemand = userService.getCaloriesDemand(email);
        // then
        assertThat(caloriesDemand).isEqualTo(1812);
    }

    @Test
    void getUserStats() {
        val user = User
                .builder()
                .height(175)
                .birthDate(Date.valueOf("2000-01-01"))
                .sex("M")
                .targetWeight(75f)
                .build();
        val email = "email";
        val weightRecord = WeightRecord.
                builder().
                weight(100f).
                build();
        val waterIntake = WaterIntake.
                builder().
                volume(100f).
                build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(weightRecordService.getWeightRecordByToday(email)).willReturn(weightRecord);
        given(waterIntakeService.getWaterIntakeByToday(email)).willReturn(waterIntake);
        given(eatenMealsService.getCaloriesConsumedForToday(email)).willReturn(1000);
        // when
        UserSummaryResponse userStats = userService.getUserStats(email);
        // then
        assertThat(userStats.getCaloriesDemand()).isEqualTo(2154);
        assertThat(userStats.getCaloriesConsumedToday()).isEqualTo(1000);
        assertThat(userStats.getCaloriesLeftToday()).isEqualTo(1154);
        assertThat(userStats.getTodayWeight()).isEqualTo(100);
        assertThat(userStats.getTargetWeight()).isEqualTo(75);
        assertThat(userStats.getWaterToday()).isEqualTo(100);
        assertThat(userStats.getWaterDemand()).isEqualTo(2000);
    }
}
