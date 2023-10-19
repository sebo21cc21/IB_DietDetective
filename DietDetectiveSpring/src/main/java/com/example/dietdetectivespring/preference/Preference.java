package com.example.dietdetectivespring.preference;

import com.example.dietdetectivespring.meal.Meal;
import com.example.dietdetectivespring.person.Person;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;
@Entity
@Table(name = "preferences")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Preference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "preferences_meals",
            joinColumns = @JoinColumn(name = "preferenceid"),
            inverseJoinColumns = @JoinColumn(name = "mealid"))
    @ToString.Exclude
    List<Meal> meals;

    @ManyToMany(mappedBy = "preferences", fetch = FetchType.LAZY)
    @ToString.Exclude
    List<Person> persons;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Preference that = (Preference) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
