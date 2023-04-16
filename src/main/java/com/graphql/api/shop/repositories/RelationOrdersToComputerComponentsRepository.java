package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.RelationOrdersToComputerComponents;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationOrdersToComputerComponentsRepository extends JpaRepository<RelationOrdersToComputerComponents, Long> {
}
