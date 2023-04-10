package com.graphql.api.security.jwt.repositories;

import com.graphql.api.security.jwt.models.JwtModel;
import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.jwt.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JwtModelRepository extends JpaRepository<JwtModel, Long> {
    List<JwtModel> findByUser(User user);
    JwtModel findByAccessToken(Token token);
    JwtModel findByRefreshToken(Token token);
    JwtModel findByUserAndAccessToken(User user, Token token);
    JwtModel findByUserAndRefreshToken(User user, Token token);
}
