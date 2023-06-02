package com.graphql.api.security.jwt.services.impl;

import com.graphql.api.security.jwt.models.TypeToken;
import com.graphql.api.security.jwt.repositories.TypeTokenRepository;
import com.graphql.api.security.jwt.services.TypeTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeTokenServiceImpl implements TypeTokenService {
    private final TypeTokenRepository typeTokenRepository;
    @Autowired
    public TypeTokenServiceImpl(TypeTokenRepository typeTokenRepository) {
        this.typeTokenRepository = typeTokenRepository;
    }

    @Override
    public TypeToken saveToken(TypeToken typeToken) {
        return typeTokenRepository.save(typeToken);
    }

    @Override
    public TypeToken findByName(String name) {
        return typeTokenRepository.findByName(name);
    }

    @Override
    public List<TypeToken> findAllTypeTokens() {
        return typeTokenRepository.findAll();
    }

    @Override
    public List<TypeToken> saveAllTypeTokens(Iterable<TypeToken> typeTokens) {
        return typeTokenRepository.saveAll(typeTokens);
    }
}
