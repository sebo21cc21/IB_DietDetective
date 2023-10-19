package com.example.dietdetectivespring.ingredient;

import com.example.dietdetectivespring.ingredientcharacter.IngredientCharacter;
import com.example.dietdetectivespring.meal.Meal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "ingredients")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ingredientcharacterid", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private IngredientCharacter ingredientCharacter;


    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "unit", nullable = false, length = 5)
    private String unit;
    @Column(name = "amountofcalories")
    private double amountOfCalories;

    @Column(name = "amountofcarbohydrates")
    private double amountOfCarbohydrates;

    @Column(name = "amountofproteins")
    private double amountOfProteins;

    @Column(name = "amountoffats")
    private double amountOfFats;

    @ManyToMany(mappedBy = "ingredients", fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    List<Meal> meals;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Ingredient that = (Ingredient) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
