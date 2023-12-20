package com.example.dietdetectivespring.waterintake;

import com.example.dietdetectivespring.config.security.JwtAuthenticationFilter;
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
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = WaterIntakeController.class,
        excludeFilters =
        @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = JwtAuthenticationFilter.class))
@AutoConfigureMockMvc(addFilters = false)
@WithMockUser(username = "email")
class WaterIntakeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private WaterIntakeService waterIntakeService;

    @Test
    void getWaterIntakeByUserTest() throws Exception {
        //given
        val waterIntakes = List.of(WaterIntake.builder()
                .id(1)
                .volume(100f)
                .build());
        val email = "email";
        given(waterIntakeService.getUserWaterIntake(email)).willReturn(waterIntakes);
        //when
        val resultActions = mockMvc.perform(get("/water")
                .contentType(MediaType.APPLICATION_JSON));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    void addUserWaterIntake() throws Exception {
        //given
        val waterIntakeRequest = WaterIntakeRequest.builder()
                .volume(100f)
                .build();
        val email = "email";
        val waterIntake = WaterIntake.builder()
                .id(1)
                .volume(100f)
                .build();

        given(waterIntakeService.addWaterIntake(waterIntakeRequest, email)).willReturn(waterIntake);

        //when
        val resultActions = mockMvc.perform(post("/water")
                .content(objectMapper.writeValueAsString(waterIntakeRequest))
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.volume").value(100f));
    }

    @Test
    void addNotUserWaterIntake() throws Exception {
        //given
        val waterIntakeRequest = WaterIntakeRequest.builder()
                .volume(100f)
                .build();
        val email = "email";
        given(waterIntakeService.addWaterIntake(waterIntakeRequest, email)).willThrow(new EntityNotFoundException());

        //when
        val resultActions = mockMvc.perform(post("/water")
                .content(objectMapper.writeValueAsString(waterIntakeRequest))
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isNotFound());
    }
}