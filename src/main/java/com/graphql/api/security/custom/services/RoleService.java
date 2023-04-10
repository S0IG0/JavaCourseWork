package com.graphql.api.security.custom.services;

import com.graphql.api.security.custom.models.Role;

import java.util.List;

public interface RoleService {
    Role findByName(String name);
    Role saveRole(Role role);
    List<Role> findAllRoles();
    List<Role> saveAllRoles(Iterable<Role> roles);
}
