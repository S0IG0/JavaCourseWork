package com.graphql.api.security.jwt.services.impl;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.custom.services.UserService;
import com.graphql.api.security.httpTypes.JwtRequest;
import com.graphql.api.security.httpTypes.JwtResponse;
import com.graphql.api.security.jwt.models.JwtModel;
import com.graphql.api.security.jwt.services.AuthService;
import com.graphql.api.security.jwt.services.JwtModelService;
import com.graphql.api.security.jwt.services.TokenService;
import com.graphql.api.security.jwt.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final JwtModelService jwtModelService;
    private final TokenService tokenService;

    @Autowired
    public AuthServiceImpl(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils,
            JwtModelService jwtModelService,
            TokenService tokenService
    ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.jwtModelService = jwtModelService;
        this.tokenService = tokenService;
    }

    private User validateUserByUsername(String username) throws AuthException {
        final User user = userService.findByUsername(username);
        if (user == null) {
            throw new AuthException("User not found");
        }
        return user;
    }

    private User validateUserByUsernameAndPassword(String username, String password) throws AuthException {
        final User user = validateUserByUsername(username);
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthException("Incorrect data");
        }
        return user;
    }

    private User validateRefreshTokenAndGetUser(String refreshToken) throws AuthException {
        if (!jwtUtils.validateRefreshToken(refreshToken)) {
            throw new AuthException("Incorrect data");
        }
        final Claims claims = jwtUtils.getClaimsRefreshToken(refreshToken);
        final String username = claims.getSubject();
        return validateUserByUsername(username);
    }

    @Override
    public JwtResponse getAccessAndRefreshTokens(JwtRequest jwtRequest) throws AuthException {
        final User user = validateUserByUsernameAndPassword(jwtRequest.getUsername(), jwtRequest.getPassword());
        final JwtModel jwtModel = jwtModelService.saveJwtModel(new JwtModel(
                tokenService.saveRefreshToken(jwtUtils.generateRefreshToken(user)),
                tokenService.saveAccessToken(jwtUtils.generateAccessToken(user)),
                user
        ));
        return new JwtResponse(
                jwtModel.getAccessToken().getValue(),
                jwtModel.getRefreshToken().getValue()
        );
    }

    @Override
    public JwtResponse getAccessToken(String refreshToken) throws AuthException {
        final User user = validateRefreshTokenAndGetUser(refreshToken);
        final JwtModel jwt = jwtModelService.findByUserAndRefreshToken(user, tokenService.findByValue(refreshToken));
        tokenService.disableToken(jwt.getAccessToken());
        final String newAccessToken = jwtUtils.generateAccessToken(user);
        jwt.setAccessToken(tokenService.saveAccessToken(newAccessToken));
        jwtModelService.saveJwtModel(jwt);

        return new JwtResponse(newAccessToken, refreshToken);
    }

    @Override
    public HttpStatus disableJwtByRefreshToken(String refreshToken) throws AuthException {
        final User user = validateRefreshTokenAndGetUser(refreshToken);
        try {
            final JwtModel jwt = jwtModelService.findByUserAndRefreshToken(user, tokenService.findByValue(refreshToken));
            tokenService.disableToken(jwt.getRefreshToken());
            tokenService.disableToken(jwt.getAccessToken());
        } catch (Exception exception) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.OK;
    }

    @Override
    public HttpStatus disableAllJwtByRefreshToken(String refreshToken) throws AuthException {
        final User user = validateRefreshTokenAndGetUser(refreshToken);
        try {
            final List<JwtModel> JWTs = jwtModelService.findByUser(user);
            for (JwtModel jwt : JWTs) {
                tokenService.disableToken(jwt.getRefreshToken());
                tokenService.disableToken(jwt.getAccessToken());
            }
        } catch (Exception exception) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.OK;
    }

    @Override
    public User getUserByRefreshToken(String refreshToken) throws AuthException {
        return validateRefreshTokenAndGetUser(refreshToken);
    }
}
