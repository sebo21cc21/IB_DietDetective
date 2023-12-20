package com.example.dietdetectivespring.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> getUser(@AuthenticationPrincipal UserDetails userPrincipal) {
        try {
            return ResponseEntity.ok(userService.getUserByEmail(userPrincipal.getUsername()));
        } catch (BadCredentialsException | EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }

    @PutMapping("/goal")
    public ResponseEntity<User> updateUserGoal(@RequestBody UserGoalRequest userGoalRequest, @AuthenticationPrincipal UserDetails userPrincipal) {
        try {
            return ResponseEntity.ok(userService.updateUserGoal(userGoalRequest, userPrincipal.getUsername()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }

    @PostMapping("/target")
    public ResponseEntity<User> updateUserTarget(@RequestBody UserTargetRequest userTargetRequest, @AuthenticationPrincipal UserDetails userPrincipal) {
        try {
            return ResponseEntity.ok(userService.updateUserTarget(userTargetRequest, userPrincipal.getUsername()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }
    @PostMapping("/premium")
    public ResponseEntity<User> updateUserPremium(@RequestBody UserPremiumRequest userPremiumRequest, @AuthenticationPrincipal UserDetails userPrincipal) {
        try {
            return ResponseEntity.ok(userService.updateUserPremium(userPremiumRequest, userPrincipal.getUsername()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }
    @PostMapping("/survey")
    public ResponseEntity<User> updateUserSurvey(@RequestBody UserSurveyRequest userSurveyRequest, @AuthenticationPrincipal UserDetails userPrincipal) {
        try {
            return ResponseEntity.ok(userService.updateUserSurvey(userSurveyRequest, userPrincipal.getUsername()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<UserSummaryResponse> getUserMonitor(@AuthenticationPrincipal UserDetails userPrincipal) {
        try {
            return ResponseEntity.ok(userService.getUserStats(userPrincipal.getUsername()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Entity not found", e);
        }
    }

}
