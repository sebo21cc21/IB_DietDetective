package com.example.dietdetectivespring.user;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;


    @Test
    void shouldFindByEmail() {
        // given
        var email = "alice@example.com";
        // when
        var user = userRepository.findByEmail(email);

        // then
        assertThat(user).isPresent();
        assertThat(user.get().getEmail()).isEqualTo(email);
    }

    @Test
    void shouldNotFindByEmail() {
        //given
        var email = "wrongEmail";
        //when
        var user = userRepository.findByEmail(email);
        //then
        assertThat(user).isEmpty();
    }

    @Test
    void existsByEmailTest() {
        //given
        var email = "alice@example.com";
        //when
        var exists = userRepository.existsByEmail(email);
        //then
        assertThat(exists).isTrue();
    }

    @Test
    void notExistsByEmailTest() {
        //given
        var email = "wrongEmail";
        //when
        var exists = userRepository.existsByEmail(email);
        //then
        assertThat(exists).isFalse();
    }
}
