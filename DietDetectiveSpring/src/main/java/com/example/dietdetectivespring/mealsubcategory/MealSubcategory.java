package com.example.dietdetectivespring.mealsubcategory;

import com.example.dietdetectivespring.mealcategory.MealCategory;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "mealsubcategories")
public class MealSubcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "mealcategoryid", nullable = false)
    @ToString.Exclude
    private MealCategory mealCategory;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MealSubcategory subcategory = (MealSubcategory) o;
        return id != null && Objects.equals(id, subcategory.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
