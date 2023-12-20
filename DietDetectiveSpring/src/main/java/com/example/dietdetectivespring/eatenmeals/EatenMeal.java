package com.example.dietdetectivespring.eatenmeals;

import com.example.dietdetectivespring.meal.Meal;
import com.example.dietdetectivespring.user.User;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.Hibernate;

import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "eaten_meals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EatenMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name="eaten_weight", nullable = false)
    private Integer eatenWeight;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "meal_id", nullable = false)
    private Meal meal;
}
