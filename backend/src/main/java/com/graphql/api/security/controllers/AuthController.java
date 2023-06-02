package com.graphql.api.security.controllers;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.httpTypes.JwtRefreshRequest;
import com.graphql.api.security.httpTypes.JwtRequest;
import com.graphql.api.security.httpTypes.JwtResponse;
import com.graphql.api.security.jwt.services.AuthService;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @QueryMapping
    public User getUserByRefreshToken(@Argument JwtRefreshRequest jwtRefreshRequest) throws AuthException {
        return authService.getUserByRefreshToken(jwtRefreshRequest.getRefreshToken());
    }

    @MutationMapping
    public JwtResponse login(@Argument JwtRequest jwtRequest) throws AuthException {
        return authService.getAccessAndRefreshTokens(jwtRequest);
    }

    @MutationMapping
    public JwtResponse refreshAccessToken(@Argument JwtRefreshRequest jwtRefreshRequest) throws AuthException {
        return authService.getAccessToken(jwtRefreshRequest.getRefreshToken());
    }

    @MutationMapping
    public String logout(@Argument String refreshToken) throws AuthException {
        authService.disableJwtByRefreshToken(refreshToken);
        return "disabled this session";
    }

    @MutationMapping
    public String logoutAllSessions(@Argument String refreshToken) throws AuthException {
        authService.disableAllJwtByRefreshToken(refreshToken);
        return "disabled all sessions";
    }
}