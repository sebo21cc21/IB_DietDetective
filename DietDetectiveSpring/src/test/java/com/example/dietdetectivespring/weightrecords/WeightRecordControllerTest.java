package com.example.dietdetectivespring.weightrecords;

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

@WebMvcTest(controllers = WeightRecordController.class,
        excludeFilters =
        @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = JwtAuthenticationFilter.class))
@AutoConfigureMockMvc(addFilters = false)
@WithMockUser(username = "email")
class WeightRecordControllerTest {


    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private WeightRecordService weightRecordService;

    @Test
    void getWeightRecordsByUser() throws Exception {
        //given
        val weightRecords = List.of(WeightRecord.builder()
                .id(1)
                .weight(100f)
                .build());

        val email = "email";

        given(weightRecordService.getUserWeightRecords(email)).willReturn(weightRecords);
        //when
        val resultActions = mockMvc.perform(get("/weight")
                .contentType(MediaType.APPLICATION_JSON));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    void getWeightRecordByToday() throws Exception {
        //given
        val weightRecord = WeightRecord.builder()
                .id(1)
                .weight(100f)
                .build();

        val email = "email";

        given(weightRecordService.getWeightRecordByToday(email)).willReturn(weightRecord);
        //when
        val resultActions = mockMvc.perform(get("/weight/today")
                .contentType(MediaType.APPLICATION_JSON));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.weight").value(100f));
    }

    @Test
    void addUserWeightRecords() throws Exception {
        //given
        val weightRecordRequest = WeightRecordRequest.builder()
                .weight(100f)
                .build();
        val email = "email";
        val weightRecord = WeightRecord.builder()
                .id(1)
                .weight(100f)
                .build();
        given(weightRecordService.addWeightRecord(weightRecordRequest, email)).willReturn(weightRecord);
        //when
        val resultActions = mockMvc.perform(post("/weight")
                .content(objectMapper.writeValueAsString(weightRecordRequest))
                .contentType(MediaType.APPLICATION_JSON));
        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.weight").value(100f));
    }

    @Test
    void addUserWeightRecordsEntityNotFoundException() throws Exception {
        //given
        val weightRecordRequest = WeightRecordRequest.builder()
                .weight(100f)
                .build();
        val email = "email";
        given(weightRecordService.addWeightRecord(weightRecordRequest, email)).willThrow(new EntityNotFoundException());
        //when
            val resultActions = mockMvc.perform(post("/weight")
                    .content(objectMapper.writeValueAsString(weightRecordRequest))
                    .contentType(MediaType.APPLICATION_JSON));
        //then
        resultActions.andExpect(status().isNotFound());
    }
}