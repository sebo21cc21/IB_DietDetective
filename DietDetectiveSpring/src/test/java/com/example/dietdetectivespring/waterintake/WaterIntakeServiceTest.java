package com.example.dietdetectivespring.waterintake;

import com.example.dietdetectivespring.user.User;
import com.example.dietdetectivespring.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class WaterIntakeServiceTest {

    @Mock
    private WaterIntakeRepository waterIntakeRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private WaterIntakeService waterIntakeService;

    @Test
    void getUserWaterIntakes() {
        //given
        val email = "test@email.com";
        val waterIntake = WaterIntake.builder()
                .volume(5F)
                .build();

        given(waterIntakeRepository.findByUserEmail(email)).willReturn(List.of(waterIntake));
        //when
        val waterIntakes = waterIntakeService.getUserWaterIntake(email);
        //then
        assertThat(waterIntakes.size()).isEqualTo(1);
    }

    @Test
    void getUserWaterIntakesEmptyList() {
        //given
        val email = "wrongEmail";
        given(waterIntakeRepository.findByUserEmail(email)).willReturn(List.of());
        //when
        val waterIntakes = waterIntakeService.getUserWaterIntake(email);
        //then
        assertThat(waterIntakes.size()).isEqualTo(0);
    }

    @Test
    void getWaterIntakeByToday() {
        //given
        val email = "test@email.com";
        val waterIntake = WaterIntake.builder()
                .volume(5F)
                .build();
        given(waterIntakeRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.of(waterIntake));
        //when
        val waterIntakeByToday = waterIntakeService.getWaterIntakeByToday(email);
        //then
        assertThat(waterIntakeByToday.getVolume()).isEqualTo(waterIntake.getVolume());
    }

    @Test
    void getWaterIntakeByTodayOptionalEmpty() {
        //given
        val email = "wrongEmail";
        given(waterIntakeRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.empty());
        //when
        val waterIntakeByToday = waterIntakeService.getWaterIntakeByToday(email);
        //then
        assertThat(waterIntakeByToday.getVolume()).isEqualTo(0F);
    }

    @Test
    void addWaterIntake() {
        //given
        val email = "test@email.com";
        val waterIntakeRequest = WaterIntakeRequest.builder()
                .volume(5F)
                .build();
        val user = User.builder()
                .email(email)
                .build();

        val waterIntake = WaterIntake.builder()
                .volume(5F)
                .build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(waterIntakeRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.empty());
        given(waterIntakeRepository.save(any())).willReturn(waterIntake);

        //when
        val addWaterIntake = waterIntakeService.addWaterIntake(waterIntakeRequest, email);

        //then
        assertThat(addWaterIntake.getVolume()).isEqualTo(waterIntakeRequest.getVolume());
    }

    @Test
    void addWaterIntakeUpdate() {
        //given
        val waterIntakeRequest = WaterIntakeRequest.builder()
                .volume(10F)
                .build();
        val email = "test@email.com";

        val user = User.builder()
                .email(email)
                .build();

        val waterIntake = WaterIntake.builder()
                .volume(5F)
                .build();
        val updatedWaterIntake = WaterIntake.builder()
                .volume(15F)
                .build();

        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(waterIntakeRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.of(waterIntake));
        given(waterIntakeRepository.save(any())).willReturn(updatedWaterIntake);

        //when
        val addWaterIntake = waterIntakeService.addWaterIntake(waterIntakeRequest, email);

        //then
        assertThat(addWaterIntake.getVolume()).isEqualTo(updatedWaterIntake.getVolume());

    }

    @Test
    void addWaterIntakeEntityNotFoundException() {
        //given
        val waterIntakeRequest = WaterIntakeRequest.builder()
                .volume(10F)
                .build();
        val email = "wrongEmail";

        given(userRepository.findByEmail(email)).willReturn(Optional.empty());

        //when
        //then
        assertThatThrownBy(() -> waterIntakeService.addWaterIntake(waterIntakeRequest, email))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("User not found");
    }
}