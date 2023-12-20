package com.example.dietdetectivespring.auth;

import com.example.dietdetectivespring.config.security.JwtService;
import com.example.dietdetectivespring.user.AuthProvider;
import com.example.dietdetectivespring.user.User;
import com.example.dietdetectivespring.user.UserRepository;
import com.example.dietdetectivespring.user.security.UserPrincipal;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;
    @InjectMocks
    private AuthenticationService authenticationService;


    @Test
    void shouldAuthenticate() {
        //given
        val authenticationRequest = AuthenticationRequest.builder()
                .email("email@email.com")
                .password("password")
                .build();

        val user = User.builder()
                .id(1)
                .password("password")
                .email("email")
                .firstName("firstName")
                .lastName("lastName")
                .build();

        val token = "token";
        val date = new Date();
        val authenticationResponse = AuthenticationResponse.builder()
                .token(token)
                .expiration(date)
                .firstName("firstName")
                .build();

        given(userRepository.findByEmail(authenticationRequest.getEmail())).willReturn(Optional.of(user));
        given(jwtService.generateToken(any())).willReturn(token);
        given(jwtService.getTokenExpiration(token)).willReturn(date);

        //when
        AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);

        //then
        assertThat(response).isEqualTo(authenticationResponse);
    }

    @Test
    void shouldNotAuthenticate() {
        //given
        val authenticationRequest = AuthenticationRequest.builder()
                .email("email@email.com")
                .password("password")
                .build();


        given(authenticationManager.authenticate(any())).willThrow(BadCredentialsException.class);


        //when
        assertThatThrownBy(() -> authenticationService.authenticate(authenticationRequest)).
                isInstanceOf(BadCredentialsException.class);

        //then
        verify(jwtService, times(0)).generateToken(any());
    }

    @Test
    void shouldRegister() {
        //given
        val registerRequest = RegisterRequest.builder()
                .email("email")
                .password("password")
                .firstname("firstName")
                .lastname("lastName")
                .build();
        val token = "token";
        val date = new Date();
        val user = User.builder()
                .password("password")
                .email("email")
                .firstName("firstName")
                .lastName("lastName")
                .build();

        val authenticationResponse = AuthenticationResponse.builder()
                .token(token)
                .expiration(date)
                .firstName("firstName")
                .build();

        given(userRepository.existsByEmail(registerRequest.getEmail())).willReturn(false);
        given(passwordEncoder.encode(registerRequest.getPassword())).willReturn("password");
        given(userRepository.save(any(User.class))).willReturn(user);
        given(jwtService.generateToken(any())).willReturn(token);
        given(jwtService.getTokenExpiration(token)).willReturn(date);

        //when
        AuthenticationResponse response = authenticationService.register(registerRequest);

        //then
        verify(userRepository, times(1)).save(any());
        assertThat(response).isEqualTo(authenticationResponse);
    }

    @Test
    void shouldNotRegister() {
        //given
        val registerRequest = RegisterRequest.builder()
                .email("email")
                .password("password")
                .firstname("firstName")
                .lastname("lastName")
                .build();

        given(userRepository.existsByEmail(registerRequest.getEmail())).willReturn(true);

        //when
        assertThatThrownBy(() -> authenticationService.register(registerRequest)).
                isInstanceOf(EntityExistsException.class);

        //then
        verify(jwtService, times(0)).generateToken(any());
    }

    @Test
    void shouldValidate() {
        val token = "token";
        val email = "email";
        val user = User.builder()
                .id(1)
                .password("password")
                .email("email")
                .firstName("firstName")
                .lastName("lastName")
                .build();
        given(jwtService.extractUsername(token)).willReturn(email);
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(jwtService.isTokenValid(token, UserPrincipal.create(user))).willReturn(true);

        //when
        AuthenticationResponse response = authenticationService.validate(token);

        //then
        assertThat(response.getFirstName()).isEqualTo(user.getFirstName());
    }

    @Test
    void shouldNotValidate() {
        val token = "token";
        val email = "email";
        val user = User.builder()
                .id(1)
                .password("password")
                .email("email")
                .firstName("firstName")
                .lastName("lastName")
                .build();
        given(jwtService.extractUsername(token)).willReturn(email);
        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
        given(jwtService.isTokenValid(token, UserPrincipal.create(user))).willReturn(false);

        //when
        assertThatThrownBy(() -> authenticationService.validate(token)).
                isInstanceOf(EntityNotFoundException.class);
    }

}