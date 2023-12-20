package com.example.dietdetectivespring.user;

import com.example.dietdetectivespring.config.security.JwtAuthenticationFilter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Date;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class,
        excludeFilters =
        @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = JwtAuthenticationFilter.class))
@AutoConfigureMockMvc(addFilters = false)
@WithMockUser(username = "email")
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private UserService userService;

    @Test
    void shouldGetUser() throws Exception {
        //given
        val user = User.builder()
                .id(1)
                .firstName("name")
                .email("email")
                .password("password")
                .build();
        given(userService.getUserByEmail(user.getEmail())).willReturn(user);

        //when
        val resultActions = mockMvc.perform(get("/users/me"));
        //then
        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.id").value(user.getId()));
    }

    @Test
    void shouldNotGetUser() throws Exception {
        //given
        val user = User.builder()
                .id(1)
                .firstName("name")
                .email("email")
                .password("password")
                .build();
        given(userService.getUserByEmail(user.getEmail())).willThrow(EntityNotFoundException.class);

        //when
        val resultActions = mockMvc.perform(get("/users/me"));
        //then
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateUserGoal() throws Exception {
        //given
        val userGoalRequest = UserGoalRequest.builder()
                .goal("goal")
                .build();
        val email = "email";
        val user = User.builder()
                .id(1)
                .firstName("name")
                .email("email")
                .password("password")
                .goal("goal")
                .build();

        given(userService.updateUserGoal(userGoalRequest, email)).willReturn(user);
        //when
        val resultActions = mockMvc.perform(put("/users/goal")
                .content(objectMapper.writeValueAsString(userGoalRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.goal").value(user.getGoal()));
    }

    @Test
    void shouldNotUpdateUserGoal() throws Exception {
        //given
        val userGoalRequest = UserGoalRequest.builder()
                .goal("goal")
                .build();
        given(userService.updateUserGoal(userGoalRequest, "email")).willThrow(EntityNotFoundException.class);

        //when
        val resultActions = mockMvc.perform(put("/users/goal")
                .content(objectMapper.writeValueAsString(userGoalRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateUserTarget() throws Exception {
        //given
        val userTargetRequest = UserTargetRequest.builder()
                .targetWeight(10f)
                .build();
        val email = "email";
        val user = User.builder()
                .id(1)
                .firstName("name")
                .email("email")
                .password("password")
                .targetWeight(10f)
                .build();

        given(userService.updateUserTarget(userTargetRequest, email)).willReturn(user);
        //when
        val resultActions = mockMvc.perform(post("/users/target")
                .content(objectMapper.writeValueAsString(userTargetRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.targetWeight").value(user.getTargetWeight()));
    }

    @Test
    void shouldNotUpdateUserTarget() throws Exception {
        //given
        val userTargetRequest = UserTargetRequest.builder()
                .targetWeight(10f)
                .build();
        given(userService.updateUserTarget(userTargetRequest, "email")).willThrow(EntityNotFoundException.class);

        //when
        val resultActions = mockMvc.perform(post("/users/target")
                .content(objectMapper.writeValueAsString(userTargetRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateUserPremium() throws Exception {
        //given
        val userPremiumRequest = UserPremiumRequest.builder()
                .premium(true)
                .build();
        val email = "email";
        val user = User.builder()
                .id(1)
                .firstName("name")
                .email("email")
                .password("password")
                .premium(true)
                .build();
        given(userService.updateUserPremium(userPremiumRequest, email)).willReturn(user);
        //when
        val resultActions = mockMvc.perform(post("/users/premium")
                .content(objectMapper.writeValueAsString(userPremiumRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.premium").value(user.getPremium()));
    }

    @Test
    void shouldNotUpdateUserPremium() throws Exception {
        //given
        val userPremiumRequest = UserPremiumRequest.builder()
                .premium(true)
                .build();
        given(userService.updateUserPremium(userPremiumRequest, "email")).willThrow(EntityNotFoundException.class);
        //when
        val resultActions = mockMvc.perform(post("/users/premium")
                .content(objectMapper.writeValueAsString(userPremiumRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateUserSurvey() throws Exception {
        //given
        val userSurveyRequest = UserSurveyRequest.builder()
                .weight(10f)
                .birthDate(Date.valueOf("2000-01-01"))
                .sex("man")
                .height(10)
                .targetWeight(10f)
                .build();
        val email = "email";
        val user = User.builder()
                .id(1)
                .firstName("name")
                .email("email")
                .password("password")
                .birthDate(Date.valueOf("2000-01-01"))
                .sex("man")
                .height(10)
                .targetWeight(10f)
                .build();
        given(userService.updateUserSurvey(userSurveyRequest, email)).willReturn(user);
        //when
        val resultActions = mockMvc.perform(post("/users/survey")
                .content(objectMapper.writeValueAsString(userSurveyRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId()));
    }

    @Test
    void shouldNotUpdateSurvey() throws Exception {
        //given
        val userSurveyRequest = UserSurveyRequest.builder()
                .weight(10f)
                .birthDate(Date.valueOf("2000-01-01"))
                .sex("man")
                .height(10)
                .targetWeight(10f)
                .build();
        val email = "email";
        given(userService.updateUserSurvey(userSurveyRequest, email)).willThrow(EntityNotFoundException.class);
        //when
        val resultActions = mockMvc.perform(post("/users/survey")
                .content(objectMapper.writeValueAsString(userSurveyRequest))
                .contentType("application/json"));
        //then
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    void shouldGetUserSummary() throws Exception {
        //given
        val userSummaryResponse = UserSummaryResponse.builder()
                .caloriesDemand(10f)
                .caloriesConsumedToday(10f)
                .caloriesLeftToday(10f)
                .todayWeight(10f)
                .targetWeight(10f)
                .waterToday(10f)
                .waterDemand(10f)
                .build();
        val email = "email";
        given(userService.getUserStats(email)).willReturn(userSummaryResponse);
        //when
        val resultActions = mockMvc.perform(get("/users/summary"));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.caloriesDemand").value(userSummaryResponse.getCaloriesDemand()));
    }

    @Test
    void shouldNotGetUserSummary() throws Exception {
        //given
        val email = "email";
        given(userService.getUserStats(email)).willThrow(EntityNotFoundException.class);
        //when
        val resultActions = mockMvc.perform(get("/users/summary"));
        //then
        resultActions.andExpect(status().isNotFound());
    }
}
