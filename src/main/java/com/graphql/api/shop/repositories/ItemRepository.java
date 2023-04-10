package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
