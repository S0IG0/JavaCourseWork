package com.graphql.api.shop.repositories;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.shop.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByUser(User user);
}
