package com.graphql.api.shop.services;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.shop.models.Customer;

public interface CustomerService {
    Customer saveCustomer(Customer customer);
    Customer findCustomerByUser(User user);
}
