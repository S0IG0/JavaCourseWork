package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.Customer;
import com.graphql.api.shop.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByCustomer(Customer customer);
}
