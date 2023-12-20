package com.example.dietdetectivespring.weightrecords;

import com.example.dietdetectivespring.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "weight_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeightRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "weight", nullable = false)
    private Float weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
