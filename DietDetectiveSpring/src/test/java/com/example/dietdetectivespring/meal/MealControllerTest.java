package com.example.dietdetectivespring.meal;


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
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = MealController.class,
        excludeFilters =
        @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = JwtAuthenticationFilter.class))
@AutoConfigureMockMvc(addFilters = false)
public class MealControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private MealService mealService;

    @Test
    void shouldGetMealById() throws Exception {
        //given
        int id = 1;
        val meal = Meal.builder()
                .id(1)
                .name("name")
                .calories(100)
                .carbohydrates(100f)
                .fats(100f)
                .proteins(100f)
                .build();
        given(mealService.getMealById(id)).willReturn(meal);
        //when
        val resultActions = mockMvc.perform(get("/meals/{id}", id));
        //then
        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.id").value(meal.getId()));
    }

    @Test
    void shouldNotGetMealById() throws Exception {
        //given
        int id = 1;
        given(mealService.getMealById(id)).willThrow(new EntityNotFoundException());
        //when
        val resultActions = mockMvc.perform(get("/meals/{id}", id));
        //then
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    void shouldGetMealsByCategoryIds() throws Exception {
        //given
        val meals = List.of(Meal.builder()
                .id(1)
                .name("name")
                .calories(100)
                .carbohydrates(100f)
                .fats(100f)
                .proteins(100f)
                .build());
        given(mealService.getMealsByCategoryIds(List.of(1, 2))).willReturn(meals);
        //when
        val resultActions = mockMvc.perform(get("/meals/category/1,2"));
        //then
        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$[0].id").value(meals.get(0).getId()));
    }

    @Test
    void shouldNotGetMealsByCategoryIds() throws Exception {
        //given
        given(mealService.getMealsByCategoryIds(List.of(1, 2))).willThrow(new EntityNotFoundException());
        //when
        val resultActions = mockMvc.perform(get("/meals/category/1,2"));
        //then
        resultActions.andExpect(status().isNotFound());
    }

}
