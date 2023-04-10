package com.graphql.api.security.jwt.models;

import com.graphql.api.security.jwt.models.base.BaseToken;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class TypeToken extends BaseToken {
    private Duration lifeTime;

    @OneToMany(mappedBy = "typeToken")
    private List<Token> tokens;

    public TypeToken(String name, Duration lifeTime) {
        setName(name);
        this.lifeTime = lifeTime;
    }
}
