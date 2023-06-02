package com.graphql.api.security.jwt.repositories;

import com.graphql.api.security.jwt.models.TypeToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeTokenRepository extends JpaRepository<TypeToken, Long> {
    TypeToken findByName(String name);
}
