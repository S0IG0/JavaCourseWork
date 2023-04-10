package com.graphql.api.security.jwt.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 1024)
    private String value;
    @CreatedDate
    private Date created = new Date();
    @ManyToOne
    private TypeToken typeToken;
    @ManyToOne
    private StateToken stateToken;

    public Token(String value, TypeToken typeToken, StateToken stateToken) {
        this.value = value;
        this.typeToken = typeToken;
        this.stateToken = stateToken;
    }
}
