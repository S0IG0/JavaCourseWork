package com.graphql.api.shop.controllers;

import com.graphql.api.shop.models.Customer;
import com.graphql.api.shop.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Component
@Controller
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @MutationMapping
    public Customer createCustomer(@Argument Customer customer) {
        return customerService.saveCustomer(customer);
    }
}
