package com.example.dietdetectivespring.waterintake;

import com.example.dietdetectivespring.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "water_intake")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaterIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "volume", nullable = false)
    private Float volume;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
