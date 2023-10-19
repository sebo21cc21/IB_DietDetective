package com.example.dietdetectivespring.person;

import com.example.dietdetectivespring.country.Country;
import com.example.dietdetectivespring.ingredient.Ingredient;
import com.example.dietdetectivespring.meal.Meal;
import com.example.dietdetectivespring.preference.Preference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
@Entity
@Table(name = "persons")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "countryid")
    @ToString.Exclude
    private Country country;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "dateofbirth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "height")
    private double height;

    @Column(name = "weight")
    private double weight;

    @Column(name = "estimated_weight")
    private double estimated_weight;

    @Column(name = "modifieddate", nullable = false)
    private LocalDateTime modifiedDate;

    @ManyToMany
    @JoinTable(
            name = "persons_meals",
            joinColumns = @JoinColumn(name = "personid"),
            inverseJoinColumns = @JoinColumn(name = "mealid"))
    @ToString.Exclude
    List<Meal> meals;

    @ManyToMany
    @JoinTable(
            name = "persons_preferences",
            joinColumns = @JoinColumn(name = "personid"),
            inverseJoinColumns = @JoinColumn(name = "preferenceid"))
    @ToString.Exclude
    List<Preference> preferences;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Person that = (Person) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}