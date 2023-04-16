package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
