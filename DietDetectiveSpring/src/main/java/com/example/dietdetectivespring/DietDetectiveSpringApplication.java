package com.example.dietdetectivespring;

import com.example.dietdetectivespring.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class DietDetectiveSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(DietDetectiveSpringApplication.class, args);
    }

}
