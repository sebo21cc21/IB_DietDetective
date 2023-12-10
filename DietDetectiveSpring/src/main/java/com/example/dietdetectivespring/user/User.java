package com.example.dietdetectivespring.user;

import com.example.dietdetectivespring.eatenmeals.EatenMeal;
import com.example.dietdetectivespring.waterintake.WaterIntake;
import com.example.dietdetectivespring.weightrecords.WeightRecord;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.Hibernate;

import java.sql.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "birth_date")
    private Date birthDate;

    @Column(name = "target_weight")
    private Float targetWeight;

    @Column(name = "goal")
    private String goal;

    @Column(name = "sex")
    private String sex;

    @Column(name = "height")
    private Integer height;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @JsonIgnore
    private String providerId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User that = (User) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public void setSurvey(UserSurveyRequest userSurveyRequest) {
        this.birthDate = userSurveyRequest.getBirthDate();
        this.targetWeight = userSurveyRequest.getTargetWeight();
        this.goal = userSurveyRequest.getGoal();
        this.sex = userSurveyRequest.getSex();
        this.height = userSurveyRequest.getHeight();
    }
}
