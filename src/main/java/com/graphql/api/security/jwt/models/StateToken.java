package com.graphql.api.security.jwt.models;

import com.graphql.api.security.jwt.models.base.BaseToken;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StateToken extends BaseToken {
    @OneToMany(mappedBy = "stateToken")
    private List<Token> tokens;

    public StateToken(String name) {
        setName(name);
    }
}
