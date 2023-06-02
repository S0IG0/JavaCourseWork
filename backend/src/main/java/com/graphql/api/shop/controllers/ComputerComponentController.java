package com.graphql.api.shop.controllers;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.custom.services.UserService;
import com.graphql.api.shop.models.ComputerComponent;
import com.graphql.api.shop.models.Publisher;
import com.graphql.api.shop.services.ComputerComponentService;
import com.graphql.api.shop.services.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Component
@Controller
@CrossOrigin
public class ComputerComponentController {
    private final ComputerComponentService computerComponentService;
    private final UserService userService;
    private final PublisherService publisherService;

    @Autowired
    public ComputerComponentController(ComputerComponentService computerComponentService, UserService userService, PublisherService publisherService) {
        this.computerComponentService = computerComponentService;
        this.userService = userService;
        this.publisherService = publisherService;
    }

    @QueryMapping
    public List<ComputerComponent> findAllComputerComponent() {
        return computerComponentService.findAllComputerComponents();
    }

    @QueryMapping
    public ComputerComponent findComputerComponentById(@Argument Long id) {
        return computerComponentService.findComputerComponentById(id);
    }

    @PreAuthorize("hasAuthority('ROLE_PUBLISHER')")
    @MutationMapping
    public ComputerComponent createComputerComponent(ComputerComponent computerComponent) {
        User user = userService.findByUsername(SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
                .toString()
        );
        Publisher publisher = publisherService.findPublisherByUser(user);
        computerComponent.setPublisher(publisher);

        return computerComponentService.saveComputerComponent(computerComponent);
    }
}
