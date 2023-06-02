package com.graphql.api.shop.controllers;

import com.graphql.api.security.httpTypes.JwtRefreshRequest;
import com.graphql.api.security.jwt.services.AuthService;
import com.graphql.api.shop.models.Customer;
import com.graphql.api.shop.services.CustomerService;
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
public class CustomerController {
    private final CustomerService customerService;
    private final AuthService authService;

    @Autowired
    public CustomerController(CustomerService customerService, AuthService authService) {
        this.customerService = customerService;
        this.authService = authService;
    }
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @QueryMapping
    public Customer getCustomerByRefreshToken(@Argument JwtRefreshRequest jwtRefreshRequest) throws AuthException {
        return customerService.findCustomerByUser(authService.getUserByRefreshToken(jwtRefreshRequest.getRefreshToken()));
    }

    @MutationMapping
    public Customer createCustomer(@Argument Customer customer) {
        return customerService.saveCustomer(customer);
    }
}
