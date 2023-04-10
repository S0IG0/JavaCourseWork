package com.graphql.api.security.jwt.repositories;

import com.graphql.api.security.jwt.models.StateToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateTokenRepository extends JpaRepository<StateToken, Long> {
    StateToken findByName(String name);
}
