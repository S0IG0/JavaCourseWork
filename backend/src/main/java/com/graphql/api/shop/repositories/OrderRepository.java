package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.Customer;
import com.graphql.api.shop.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByCustomer(Customer customer);
}
