package com.graphql.api.security.jwt.repositories;

import com.graphql.api.security.jwt.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Token findByValue(String value);
}
