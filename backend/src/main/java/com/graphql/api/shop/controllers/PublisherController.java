package com.graphql.api.shop.controllers;

import com.graphql.api.security.httpTypes.JwtRefreshRequest;
import com.graphql.api.security.jwt.services.AuthService;
import com.graphql.api.shop.models.Publisher;
import com.graphql.api.shop.services.PublisherService;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Component
@Controller
@CrossOrigin
public class PublisherController {
    private final PublisherService publisherService;
    private final AuthService authService;

    @Autowired
    public PublisherController(PublisherService publisherService, AuthService authService) {
        this.publisherService = publisherService;
        this.authService = authService;
    }

    @PreAuthorize("hasAuthority('ROLE_PUBLISHER')")
    @QueryMapping
    public Publisher getPublisherByRefreshToken(@Argument JwtRefreshRequest jwtRefreshRequest) throws AuthException {
        return publisherService.findPublisherByUser(authService.getUserByRefreshToken(jwtRefreshRequest.getRefreshToken()));
    }

    @MutationMapping
    public Publisher createPublisher(@Argument Publisher publisher) {
        return publisherService.savePublisher(publisher);
    }
}
