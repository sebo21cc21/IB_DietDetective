package com.example.dietdetectivespring.user.security;

import com.example.dietdetectivespring.user.User;
import com.example.dietdetectivespring.user.UserRepository;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsService userDetailsService;

    @Test
    void shouldLoadUserByUsername() {
        // given
        val email = "email";
        val user = User
                .builder()
                .email(email)
                .build();
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        // when
        UserDetails userByEmail =  userDetailsService.loadUserByUsername(email);
        // then
        assertThat(userByEmail.getUsername()).isEqualTo(email);
    }

    @Test
    void shouldNotLoadUserByUsername() {
        // given
        val email = "email";
        given(userRepository.findByEmail(email)).willReturn(Optional.empty());
        // when
        // then
        assertThatThrownBy(() -> userDetailsService.loadUserByUsername(email))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("User not found with email : " + email);
    }
}
