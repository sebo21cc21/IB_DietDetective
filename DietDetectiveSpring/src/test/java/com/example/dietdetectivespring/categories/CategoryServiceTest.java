package com.example.dietdetectivespring.categories;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @Test
     void shouldGetAllCategoriesTest() {
        // given
        val category = Category.builder()
                .id(1)
                .name("Fruits")
                .build();

        val category2 = Category.builder()
                .id(2)
                .name("Vegetables")
                .build();

        given(categoryRepository.findAll()).willReturn(List.of(category, category2));

        // when
        List<Category> result = categoryService.getAllCategories();

        // Assert
        assertThat(result).containsExactly(category, category2);
    }

    @Test
    void shouldGetEmptyListCategoriesTest() {
        // given
        given(categoryRepository.findAll()).willReturn(List.of());

        // when
        List<Category> result = categoryService.getAllCategories();

        // Assert
        assertThat(result).isEmpty();
    }
}
