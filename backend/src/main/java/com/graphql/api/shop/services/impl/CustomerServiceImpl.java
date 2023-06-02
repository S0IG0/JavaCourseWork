package com.graphql.api.shop.services.impl;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.custom.services.UserService;
import com.graphql.api.shop.models.Customer;
import com.graphql.api.shop.models.Order;
import com.graphql.api.shop.repositories.CustomerRepository;
import com.graphql.api.shop.services.CustomerService;
import com.graphql.api.shop.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final UserService userService;
    private final OrderService orderService;

    @Autowired
    public CustomerServiceImpl(
            CustomerRepository customerRepository,
            UserService userService,
            OrderService orderService
    ) {
        this.customerRepository = customerRepository;
        this.userService = userService;
        this.orderService = orderService;
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        if (customer.getUser().getId() == null) {
            customer.setUser(userService.saveUser(customer.getUser()));
        }
        customer = customerRepository.save(customer);
        if (customer.getOrder() == null) {
            customer.setOrder(orderService.saveOrder(new Order(customer)));
        }
        return customer;
    }

    @Override
    public Customer findCustomerByUser(User user) {
        return customerRepository.findByUser(user);
    }
}
