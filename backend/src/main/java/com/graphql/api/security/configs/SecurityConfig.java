package com.graphql.api.security.configs;


import com.graphql.api.security.custom.models.Role;
import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.custom.models.enumerates.ERole;
import com.graphql.api.security.custom.services.RoleService;
import com.graphql.api.security.custom.services.UserService;
import com.graphql.api.security.jwt.filters.JwtFilter;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.*;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleService roleService;
    private final JwtFilter jwtFilter;
    private final String adminUsername;
    private final String adminPassword;
    private final String adminEmail;

    @Autowired
    public SecurityConfig(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder,
            UserService userService,
            RoleService roleService,
            JwtFilter jwtFilter,
            @Value("${spring.admin.username}") String adminUsername,
            @Value("${spring.admin.password}") String adminPassword,
            @Value("${spring.admin.email}") String adminEmail
    ) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.jwtFilter = jwtFilter;
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
        this.adminEmail = adminEmail;
    }

    @Autowired
    public void configureGlobal(@NotNull AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/graphql").permitAll()
                        .requestMatchers("/graphiql").permitAll()
                        .requestMatchers("/images").permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .anyRequest().authenticated()
                        .and().addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                ).httpBasic().disable();
        return http.build();
    }

    @PostConstruct
    public void initialization() {
        List<Role> roles = roleService.saveAllRoles(new ArrayList<>() {{
            add(new Role(ERole.ROLE_ADMIN.toString()));
            add(new Role(ERole.ROLE_USER.toString()));
            add(new Role(ERole.ROLE_PUBLISHER.toString()));
        }});
        User admin = userService.saveUser(new User(
                adminUsername,
                adminUsername,
                adminUsername,
                adminEmail,
                adminPassword,
                new HashSet<>(roleService.findAllRoles())
        ));

        log.info("roles: {}, admin: {}", roles, admin);
    }
}

