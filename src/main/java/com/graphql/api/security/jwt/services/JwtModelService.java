package com.graphql.api.security.jwt.services;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.jwt.models.JwtModel;
import com.graphql.api.security.jwt.models.Token;

import java.util.List;

public interface JwtModelService {
    JwtModel saveJwtModel(JwtModel jwtModel);
    JwtModel findByAccessToken(Token accessToken);
    JwtModel findByRefreshToken(Token refreshToken);
    JwtModel findByUserAndAccessToken(User user, Token token);
    JwtModel findByUserAndRefreshToken(User user, Token token);
    List<JwtModel> findAllJwtModels();
    List<JwtModel> findByUser(User user);
}
