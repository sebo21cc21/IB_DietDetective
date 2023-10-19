package com.example.dietdetectivespring.fitnessplan;

import com.example.dietdetectivespring.person.Person;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "fitnessplans")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@RequiredArgsConstructor
public class FitnessPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "personid")
    @ToString.Exclude
    private Person person;

    @Column(name = "dailylimitofcalories")
    private int dailyLimitOfCalories;

    @Column(name = "weeklylimitofcalories")
    private int weeklyLimitOfCalories;

    @Column(name = "monthlylimitofcalories")
    private int monthlyLimitOfCalories;

    @Column(name = "dailyamountofwater")
    private int dailyAmountOfWater;

    @Column(name = "startdate", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "enddate")
    private LocalDateTime endDate;

    @Column(name = "modifieddate", nullable = false)
    private LocalDateTime modifiedDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FitnessPlan that = (FitnessPlan) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
