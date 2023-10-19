package com.example.dietdetectivespring.meal;

import com.example.dietdetectivespring.difficultylevel.DifficultyLevel;
import com.example.dietdetectivespring.ingredient.Ingredient;
import com.example.dietdetectivespring.mealsubcategory.MealSubcategory;
import com.example.dietdetectivespring.person.Person;
import com.example.dietdetectivespring.preference.Preference;
import com.example.dietdetectivespring.recipestep.RecipeStep;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "meals")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "mealsubcategoryid", nullable = false)
    @ToString.Exclude
    private MealSubcategory mealSubcategory;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "preparationtime")
    private int preparationTime;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "difficultylevelid", nullable = false)
    @ToString.Exclude
    private DifficultyLevel difficultyLevel;

    @Column(name = "amountofcalories")
    private double amountOfCalories;

    @Column(name = "amountofcarbohydrates")
    private double amountOfCarbohydrates;

    @Column(name = "amountofproteins")
    private double amountOfProteins;

    @Column(name = "amountoffats")
    private double amountOfFats;

    @Column(name = "numberofpeople")
    private int numberOfPeople;

    @Column(name = "modifieddate", nullable = false)
    private LocalDateTime modifiedDate;

    @ManyToMany
    @JoinTable(
            name = "meals_ingredients",
            joinColumns = @JoinColumn(name = "mealid"),
            inverseJoinColumns = @JoinColumn(name = "ingredientid"))
    @ToString.Exclude
    List<Ingredient> ingredients;

    @ManyToMany(mappedBy = "meals", fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    List<Person> persons;

    @ManyToMany(mappedBy = "meals", fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    List<Preference> preferences;

    @OneToMany(mappedBy = "meal", orphanRemoval = true)
    @ToString.Exclude
    private List<RecipeStep> recipeSteps;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Meal that = (Meal) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
