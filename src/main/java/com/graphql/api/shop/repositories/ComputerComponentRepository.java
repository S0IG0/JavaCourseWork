package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.ComputerComponent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComputerComponentRepository extends JpaRepository<ComputerComponent, Long> {
}
