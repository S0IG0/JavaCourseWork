package com.graphql.api.shop.services;

import com.graphql.api.shop.models.Customer;
import com.graphql.api.shop.models.Order;

public interface OrderService {
    Order saveOrder(Order order);
    Order findOrderByCustomer(Customer customer);
}
