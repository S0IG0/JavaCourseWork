package com.graphql.api.security.jwt.services;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.httpTypes.JwtRequest;
import com.graphql.api.security.httpTypes.JwtResponse;
import jakarta.security.auth.message.AuthException;
import org.springframework.http.HttpStatus;

public interface AuthService {
    JwtResponse getAccessAndRefreshTokens(JwtRequest jwtRequest) throws AuthException;
    JwtResponse getAccessToken(String refreshToken) throws AuthException;
    HttpStatus disableJwtByRefreshToken(String refreshToken) throws AuthException;
    HttpStatus disableAllJwtByRefreshToken(String refreshToken) throws AuthException;

    User getUserByRefreshToken(String refreshToken) throws AuthException;
}
