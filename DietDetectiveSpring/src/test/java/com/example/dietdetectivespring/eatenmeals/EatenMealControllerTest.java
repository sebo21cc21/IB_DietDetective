package com.example.dietdetectivespring.eatenmeals;

import com.example.dietdetectivespring.meal.Meal;
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
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = EatenMealController.class,
        excludeFilters =
        @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = JwtAuthenticationFilter.class))
@AutoConfigureMockMvc(addFilters = false)
@WithMockUser(username = "email")
public class EatenMealControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private EatenMealsService eatenMealsService;

    @Test
    void shouldAddEatenMeal() throws Exception {
        // given
        val eatenMealRequest = EatenMealRequest.builder()
                .mealId(1)
                .build();
        val email = "email";
        val eatenMeal = EatenMeal.builder()
                .meal(Meal.builder()
                        .id(1)
                        .name("name")
                        .calories(100)
                        .carbohydrates(100f)
                        .fats(100f)
                        .proteins(100f)
                        .build())
                .eatenWeight(100)
                .build();

        given(eatenMealsService.addEatenMeal(eatenMealRequest, email)).willReturn(eatenMeal);
        // when
        val resultActions = mockMvc.perform(post("/eaten-meals")
                .content(objectMapper.writeValueAsString(eatenMealRequest))
                .contentType(MediaType.APPLICATION_JSON));

        // then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.meal.id").value(1));
    }

    @Test
    void shouldNotAddEatenMeal() throws Exception {
        //given
        val eatenMealRequest = EatenMealRequest.builder()
                .mealId(1)
                .build();
        given(eatenMealsService.addEatenMeal(eatenMealRequest, "email")).willThrow(EntityNotFoundException.class);

        //when
        val resultActions = mockMvc.perform(post("/eaten-meals")
                .content(objectMapper.writeValueAsString(eatenMealRequest))
                .contentType(MediaType.APPLICATION_JSON));

        // then
        resultActions.andExpect(status().isNotFound());
    }

    @Test
    void shouldGetEatenMealsForToday() throws Exception {
        //given
        val eatenMeals = List.of(
                EatenMeal.builder()
                        .meal(Meal.builder()
                                .id(1)
                                .name("name")
                                .calories(100)
                                .carbohydrates(100f)
                                .fats(100f)
                                .proteins(100f)
                                .build())
                        .eatenWeight(100)
                        .build(),
                EatenMeal.builder()
                        .meal(Meal.builder()
                                .id(2)
                                .name("name2")
                                .calories(100)
                                .carbohydrates(100f)
                                .fats(100f)
                                .proteins(100f)
                                .build())
                        .eatenWeight(100)
                        .build()
        );
        given(eatenMealsService.getEatenMealsWithoutDateForToday("email")).willReturn(eatenMeals);

        //when
        val resultActions = mockMvc.perform(get("/eaten-meals/today")
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void shouldGetMealsSummary() throws Exception {
        //given
        val eatenMealsSummaryResponse = EatenMealsSummaryResponse.builder()
                .caloriesConsumedToday(100)
                .caloriesDailyDemand(100)
                .eatenMealsFromLastWeek(List.of())
                .eatenMealsToday(List.of())
                .carbohydratesConsumedToday(100f)
                .fatsConsumedToday(100f)
                .proteinsConsumedToday(100f)
                .build();
        val email = "email";

        given(eatenMealsService.getMealsSummary(email)).willReturn(eatenMealsSummaryResponse);

        //when
        val resultActions = mockMvc.perform(get("/eaten-meals/summary")
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isOk())
                .andExpect(jsonPath("$.caloriesConsumedToday").value(100))
                .andExpect(jsonPath("$.caloriesDailyDemand").value(100))
                .andExpect(jsonPath("$.eatenMealsFromLastWeek").isArray())
                .andExpect(jsonPath("$.eatenMealsToday").isArray())
                .andExpect(jsonPath("$.carbohydratesConsumedToday").value(100f))
                .andExpect(jsonPath("$.fatsConsumedToday").value(100f))
                .andExpect(jsonPath("$.proteinsConsumedToday").value(100f));
    }

    @Test
    void shouldDeleteEatenMeal() throws Exception {
        //given
        val id = 1;
        val email = "email";

        //when
        val resultActions = mockMvc.perform(delete("/eaten-meals/{id}", id)
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isOk());
    }

    @Test
    void shouldNotDeleteEatenMeal() throws Exception {
        //given
        val id = 1;
        val email = "email";
        doThrow(EntityNotFoundException.class).when(eatenMealsService).deleteEatenMeal(id, email);

        //when
        val resultActions = mockMvc.perform(delete("/eaten-meals/{id}", id)
                .contentType(MediaType.APPLICATION_JSON));

        //then
        resultActions.andExpect(status().isNotFound());
    }


}
