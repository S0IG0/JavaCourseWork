package com.graphql.api.security.jwt.services;

import com.graphql.api.security.jwt.models.TypeToken;

import java.util.List;

public interface TypeTokenService {
    TypeToken saveToken(TypeToken typeToken);
    TypeToken findByName(String name);
    List<TypeToken> findAllTypeTokens();
    List<TypeToken> saveAllTypeTokens(Iterable<TypeToken> typeTokens);
}
