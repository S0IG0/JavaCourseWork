package com.graphql.api.security.custom.services;

import com.graphql.api.security.custom.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User findByUsername(String username);
    User saveUser(User user);
    List<User> findAllUsers();
    List<User> saveAllUsers(Iterable<User> users);

}
