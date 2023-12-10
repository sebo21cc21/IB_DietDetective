package com.example.dietdetectivespring.user;

import com.example.dietdetectivespring.security.UserPrincipal;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<User> getUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            return ResponseEntity.ok(userService.getUserByEmail(userPrincipal.getEmail()));
        } catch (BadCredentialsException | EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }

    @PutMapping("/goal")
    public ResponseEntity<User> updateUserGoal(@RequestBody UserGoalRequest userGoalRequest, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            return ResponseEntity.ok(userService.updateUserGoal(userGoalRequest, userPrincipal.getEmail()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }

    @PostMapping("/target")
    public ResponseEntity<User> updateUserTarget(@RequestBody UserTargetRequest userTargetRequest, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            return ResponseEntity.ok(userService.updateUserTarget(userTargetRequest, userPrincipal.getEmail()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }

    @PostMapping("/survey")
    public ResponseEntity<User> updateUserSurvey(@RequestBody UserSurveyRequest userSurveyRequest, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            return ResponseEntity.ok(userService.updateUserSurvey(userSurveyRequest, userPrincipal.getEmail()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bad credentials", e);
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<UserSummaryResponse> getUserMonitor(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            return ResponseEntity.ok(userService.getUserStats(userPrincipal.getEmail()));
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Entity not found", e);
        }
    }

}
