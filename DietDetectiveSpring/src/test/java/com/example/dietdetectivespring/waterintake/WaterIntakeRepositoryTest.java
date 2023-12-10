package com.example.dietdetectivespring.waterintake;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class WaterIntakeRepositoryTest {

    @Autowired
    private WaterIntakeRepository waterIntakeRepository;

    @Test
    void findByUserEmail() {
        //given
        var email = "alice@example.com";
        //when
        var weightRecords = waterIntakeRepository.findByUserEmail(email);
        //then
        assertThat(weightRecords.size()).isEqualTo(30);
    }

    @Test
    void findByUserEmailEmptyList() {
        //given
        var email = "wrongEmail";
        //when
        var weightRecords = waterIntakeRepository.findByUserEmail(email);
        //then
        assertThat(weightRecords.size()).isEqualTo(0);
    }

    @Test
    void findByDateAndUserEmail() {
        //given
        var email = "alice@example.com";
        var date = Date.valueOf("2019-01-01");
        //when
        var weightRecord = waterIntakeRepository.findByDateAndUserEmail(date, email);
        //then
        assertThat(weightRecord.isPresent()).isTrue();
    }

    @Test
    void findByDateAndUserEmailEmpty() {
        //given
        var email = "wrongEmail";
        var date = Date.valueOf("2019-01-01");
        //when
        var weightRecord = waterIntakeRepository.findByDateAndUserEmail(date, email);
        //then
        assertThat(weightRecord.isPresent()).isFalse();
    }

    @Test
    void findByDateAndUserEmailWrongDate() {
        //given
        var email = "alice@example.com";
        var date = Date.valueOf("2018-01-01");

        //when
        var weightRecord = waterIntakeRepository.findByDateAndUserEmail(date, email);
        //then
        assertThat(weightRecord.isPresent()).isFalse();
    }
}