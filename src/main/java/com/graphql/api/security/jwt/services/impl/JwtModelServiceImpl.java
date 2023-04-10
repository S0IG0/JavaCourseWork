package com.graphql.api.security.jwt.services.impl;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.jwt.models.JwtModel;
import com.graphql.api.security.jwt.models.Token;
import com.graphql.api.security.jwt.repositories.JwtModelRepository;
import com.graphql.api.security.jwt.services.JwtModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JwtModelServiceImpl implements JwtModelService {
    private final JwtModelRepository jwtModelRepository;

    @Override
    public JwtModel saveJwtModel(JwtModel jwtModel) {
        return jwtModelRepository.save(jwtModel);
    }

    @Override
    public JwtModel findByAccessToken(Token accessToken) {
        return jwtModelRepository.findByAccessToken(accessToken);
    }

    @Override
    public JwtModel findByRefreshToken(Token refreshToken) {
        return jwtModelRepository.findByRefreshToken(refreshToken);
    }

    @Override
    public JwtModel findByUserAndAccessToken(User user, Token token) {
        return jwtModelRepository.findByUserAndAccessToken(user, token);
    }

    @Override
    public JwtModel findByUserAndRefreshToken(User user, Token token) {
        return jwtModelRepository.findByUserAndRefreshToken(user, token);
    }

    @Autowired
    public JwtModelServiceImpl(JwtModelRepository jwtModelRepository) {
        this.jwtModelRepository = jwtModelRepository;
    }

    @Override
    public List<JwtModel> findAllJwtModels() {
        return jwtModelRepository.findAll();
    }

    @Override
    public List<JwtModel> findByUser(User user) {
        return jwtModelRepository.findByUser(user);
    }
}
