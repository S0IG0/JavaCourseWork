package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.RelationOrdersToComputerComponents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationOrdersToComputerComponentsRepository extends JpaRepository<RelationOrdersToComputerComponents, Long> {
}
