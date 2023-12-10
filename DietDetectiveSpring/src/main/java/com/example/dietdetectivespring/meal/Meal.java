package com.example.dietdetectivespring.meal;


import com.example.dietdetectivespring.categories.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;


import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "meals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "unit")
    private String unit;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "proteins")
    private Float proteins;

    @Column(name = "carbohydrates")
    private Float carbohydrates;

    @Column(name = "fats")
    private Float fats;

    @Column(name = "preparation_time")
    private Integer preparationTime;

    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDescription;

    @Column(name = "short_description")
    private String shortDescription;


    @ManyToMany(mappedBy = "meals")
    @JsonIgnore
    @ToString.Exclude
    private Set<Category> categories;

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
