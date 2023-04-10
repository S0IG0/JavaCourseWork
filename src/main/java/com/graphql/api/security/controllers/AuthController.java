package com.graphql.api.security.controllers;

import com.graphql.api.security.httpTypes.JwtRefreshRequest;
import com.graphql.api.security.httpTypes.JwtRequest;
import com.graphql.api.security.httpTypes.JwtResponse;
import com.graphql.api.security.jwt.services.AuthService;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @QueryMapping
    public JwtResponse login(@Argument JwtRequest jwtRequest) throws AuthException {
        return authService.getAccessAndRefreshTokens(jwtRequest);
    }

    @QueryMapping
    public JwtResponse refreshAccessToken(@Argument JwtRefreshRequest request) throws AuthException {
        return authService.getAccessToken(request.getRefreshToken());
    }
}