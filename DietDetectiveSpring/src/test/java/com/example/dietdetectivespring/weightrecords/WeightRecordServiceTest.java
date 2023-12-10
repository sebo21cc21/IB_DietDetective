package com.example.dietdetectivespring.weightrecords;

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
class WeightRecordServiceTest {

    @Mock
    private WeightRecordRepository weightRecordRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private WeightRecordService weightRecordService;

    @Test
    void getUserWeightRecords() {
        //given
        val email = "test@email.com";
        val weightRecord = WeightRecord.builder()
                .weight(5F)
                .build();

        given(weightRecordRepository.findByUserEmail(email)).willReturn(List.of(weightRecord));
        //when
        val weightRecords = weightRecordService.getUserWeightRecords(email);
        //then
        assertThat(weightRecords.size()).isEqualTo(1);
    }

    @Test
    void getUserWeightRecordsEmptyList() {
        //given
        val email = "wrongEmail";
        given(weightRecordRepository.findByUserEmail(email)).willReturn(List.of());
        //when
        val weightRecords = weightRecordService.getUserWeightRecords(email);
        //then
        assertThat(weightRecords.size()).isEqualTo(0);
    }

    @Test
    void getWeightRecordByToday() {
        //given
        val email = "test@email.com";
        val weightRecord = WeightRecord.builder()
                .weight(5F)
                .build();
        given(weightRecordRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.of(weightRecord));
        //when
        val weightRecordByToday = weightRecordService.getWeightRecordByToday(email);
        //then
        assertThat(weightRecordByToday.getWeight()).isEqualTo(weightRecord.getWeight());
    }

    @Test
    void getWeightRecordByTodayOptionalEmpty() {
        //given
        val email = "wrongEmail";
        given(weightRecordRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.empty());
        //when
        val weightRecordByToday = weightRecordService.getWeightRecordByToday(email);
        //then
        assertThat(weightRecordByToday.getWeight()).isEqualTo(0F);
    }

    @Test
    void addWeightRecord() {
        //given
        val email = "test@email.com";
        val weightRecordRequest = WeightRecordRequest.builder()
                .weight(5F)
                .build();
        val user = User.builder()
                .email(email)
                .build();

        val weightRecord = WeightRecord.builder()
                .weight(5F)
                .build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(weightRecordRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.empty());
        given(weightRecordRepository.save(any())).willReturn(weightRecord);

        //when
        val weightRecordAdded = weightRecordService.addWeightRecord(weightRecordRequest, email);

        //then
        assertThat(weightRecordAdded.getWeight()).isEqualTo(weightRecordRequest.getWeight());
    }

    @Test
    void addWeightRecordUpdate() {
        //given
        val weightRecordRequest = WeightRecordRequest.builder()
                .weight(10F)
                .build();
        val email = "test@email.com";

        val user = User.builder()
                .email(email)
                .build();

        val weightRecord = WeightRecord.builder()
                .weight(5F)
                .build();
        val updatedWeightRecord = WeightRecord.builder()
                .weight(10F)
                .build();

        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(weightRecordRepository.findByDateAndUserEmail(any(), eq(email))).willReturn(Optional.of(weightRecord));
        given(weightRecordRepository.save(any())).willReturn(updatedWeightRecord);

        //when
        val weightRecordAdded = weightRecordService.addWeightRecord(weightRecordRequest, email);

        //then
        assertThat(weightRecordAdded.getWeight()).isEqualTo(weightRecordRequest.getWeight());

    }

    @Test
    void addWeightRecordEntityNotFoundException() {
        //given
        val weightRecordRequest = WeightRecordRequest.builder()
                .weight(10F)
                .build();
        val email = "wrongEmail";

        given(userRepository.findByEmail(email)).willReturn(Optional.empty());

        //when
        //then
        assertThatThrownBy(() -> weightRecordService.addWeightRecord(weightRecordRequest, email))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("User not found");
    }
}