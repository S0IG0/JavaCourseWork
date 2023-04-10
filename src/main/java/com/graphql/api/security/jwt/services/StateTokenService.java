package com.graphql.api.security.jwt.services;

import com.graphql.api.security.jwt.models.StateToken;

import java.util.List;

public interface StateTokenService {
    StateToken saveStateToken(StateToken stateToken);
    StateToken findByName(String name);
    List<StateToken> saveAllStateTokens(Iterable<StateToken> stateTokens);
}
