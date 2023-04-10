package com.graphql.api.security.jwt.services.impl;

import com.graphql.api.security.jwt.models.Token;
import com.graphql.api.security.jwt.models.enumirates.State;
import com.graphql.api.security.jwt.models.enumirates.Type;
import com.graphql.api.security.jwt.repositories.TokenRepository;
import com.graphql.api.security.jwt.services.StateTokenService;
import com.graphql.api.security.jwt.services.TokenService;
import com.graphql.api.security.jwt.services.TypeTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService {
    private final TokenRepository tokenRepository;
    private final TypeTokenService typeTokenService;
    private final StateTokenService stateTokenService;

    @Autowired
    public TokenServiceImpl(
            TokenRepository tokenRepository,
            TypeTokenService typeTokenService,
            StateTokenService stateTokenService
    ) {
        this.tokenRepository = tokenRepository;
        this.typeTokenService = typeTokenService;
        this.stateTokenService = stateTokenService;
    }

    @Override
    public Token saveAccessToken(String accessToken) {
        return tokenRepository.save(new Token(
                accessToken,
                typeTokenService.findByName(Type.ACCESS.toString()),
                stateTokenService.findByName(State.ACTIVE.toString())
        ));
    }

    @Override
    public Token saveRefreshToken(String refreshToken) {
        return tokenRepository.save(new Token(
                refreshToken,
                typeTokenService.findByName(Type.REFRESH.toString()),
                stateTokenService.findByName(State.ACTIVE.toString())
        ));
    }

    @Override
    public Token findByValue(String value) {
        return tokenRepository.findByValue(value);
    }

    @Override
    public Token disableToken(Token token) {
        token.setStateToken(stateTokenService.findByName(State.DISABLE.toString()));
        return tokenRepository.save(token);
    }
}
