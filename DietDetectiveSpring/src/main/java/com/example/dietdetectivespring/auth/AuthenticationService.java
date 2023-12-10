package com.example.dietdetectivespring.auth;


import com.example.dietdetectivespring.security.JwtService;
import com.example.dietdetectivespring.security.UserPrincipal;
import com.example.dietdetectivespring.user.AuthProvider;
import com.example.dietdetectivespring.user.User;
import com.example.dietdetectivespring.user.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EntityExistsException("User already exists");
        }

        var user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(AuthProvider.local)
                .build();
        userRepository.save(user);
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        var jwtToken = jwtService.generateToken(userPrincipal);
        var expiration = jwtService.getTokenExpiration(jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .expiration(expiration)
                .firstName(user.getFirstName())
                .isInterviewCompleted(user.getBirthDate() != null)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(EntityNotFoundException::new);

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        var jwtToken = jwtService.generateToken(userPrincipal);
        var expiration = jwtService.getTokenExpiration(jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .expiration(expiration)
                .firstName(user.getFirstName())
                .isInterviewCompleted(user.getBirthDate() != null)
                .build();
    }

    public User getUserInfo(String email) {
        return userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);
    }

    public AuthenticationResponse validate(String token) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(EntityNotFoundException::new);

        if (!jwtService.isTokenValid(token, UserPrincipal.create(user))) {
            throw new EntityNotFoundException("User not found");
        }

        return AuthenticationResponse.builder()
                .token(token)
                .expiration(jwtService.getTokenExpiration(token))
                .firstName(user.getFirstName())
                .isInterviewCompleted(user.getBirthDate() != null)
                .build();
    }
}