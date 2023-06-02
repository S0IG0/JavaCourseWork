package com.graphql.api.shop.services.impl;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.custom.models.enumerates.ERole;
import com.graphql.api.security.custom.services.RoleService;
import com.graphql.api.security.custom.services.UserService;
import com.graphql.api.shop.models.Publisher;
import com.graphql.api.shop.repositories.PublisherRepository;
import com.graphql.api.shop.services.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class PublisherServiceImpl implements PublisherService {
    private final PublisherRepository publisherRepository;
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public PublisherServiceImpl(PublisherRepository publisherRepository, UserService userService, RoleService roleService) {
        this.publisherRepository = publisherRepository;
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public Publisher savePublisher(Publisher publisher) {
        if (publisher.getUser().getId() == null) {
            User user = publisher.getUser();
            user.setRoles(new HashSet<>() {{
                add(roleService.findByName(ERole.ROLE_USER.toString()));
                add(roleService.findByName(ERole.ROLE_PUBLISHER.toString()));
            }});
            publisher.setUser(userService.saveUser(user));
        }
        return publisherRepository.save(publisher);
    }

    @Override
    public Publisher findPublisherByUser(User user) {
        return publisherRepository.findByUser(user);
    }
}
