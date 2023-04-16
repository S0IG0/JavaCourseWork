package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
