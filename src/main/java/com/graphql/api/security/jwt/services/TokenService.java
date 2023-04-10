package com.graphql.api.security.jwt.services;

import com.graphql.api.security.jwt.models.Token;

public interface TokenService {
    Token saveAccessToken(String accessToken);

    Token saveRefreshToken(String refreshToken);

    Token findByValue(String value);

    Token disableToken(Token token);
}
