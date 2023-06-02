package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.ComputerComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComputerComponentRepository extends JpaRepository<ComputerComponent, Long> {
}
