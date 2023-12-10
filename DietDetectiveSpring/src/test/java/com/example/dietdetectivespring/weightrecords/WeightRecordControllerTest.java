package com.example.dietdetectivespring.weightrecords;

import com.example.dietdetectivespring.security.JwtAuthenticationFilter;
import com.example.dietdetectivespring.waterintake.WaterIntakeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = WeightRecordController.class,
        excludeFilters =
        @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = JwtAuthenticationFilter.class))
@AutoConfigureMockMvc(addFilters = false)
class WeightRecordControllerTest {


    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private WeightRecordService weightRecordService;

    @Test
    void getWeightRecordsByUser() {
    }

    @Test
    void getWeightRecordsByUserEmptyList() {
    }

    @Test
    void addUserWeightRecords() {
    }

    @Test
    void addUserWeightRecordsEntityNotFoundException() {
    }
}