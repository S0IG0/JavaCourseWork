package com.graphql.api.security.custom.services.impl;

import com.graphql.api.security.custom.models.Role;
import com.graphql.api.security.custom.repositories.RoleRepository;
import com.graphql.api.security.custom.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> saveAllRoles(Iterable<Role> roles) {
        return roleRepository.saveAll(roles);
    }
}
