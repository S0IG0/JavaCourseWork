package com.graphql.api.security.jwt.services.impl;

import com.graphql.api.security.jwt.models.StateToken;
import com.graphql.api.security.jwt.repositories.StateTokenRepository;
import com.graphql.api.security.jwt.services.StateTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateTokenServiceImpl implements StateTokenService {
    private final StateTokenRepository stateTokenRepository;

    @Autowired
    public StateTokenServiceImpl(StateTokenRepository stateTokenRepository) {
        this.stateTokenRepository = stateTokenRepository;
    }

    @Override
    public StateToken saveStateToken(StateToken stateToken) {
        return stateTokenRepository.save(stateToken);
    }

    @Override
    public StateToken findByName(String name) {
        return stateTokenRepository.findByName(name);
    }

    @Override
    public List<StateToken> saveAllStateTokens(Iterable<StateToken> stateTokens) {
        return stateTokenRepository.saveAll(stateTokens);
    }
}
