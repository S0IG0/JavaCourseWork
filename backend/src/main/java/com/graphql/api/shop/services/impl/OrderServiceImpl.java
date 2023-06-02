package com.graphql.api.shop.services.impl;

import com.graphql.api.shop.models.Customer;
import com.graphql.api.shop.models.Order;
import com.graphql.api.shop.repositories.OrderRepository;
import com.graphql.api.shop.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order findOrderByCustomer(Customer customer) {
        return orderRepository.findByCustomer(customer);
    }
}
