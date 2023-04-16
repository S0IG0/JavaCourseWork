package com.graphql.api.shop.repositories;

import com.graphql.api.shop.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
