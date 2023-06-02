package com.graphql.api.shop.repositories;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.shop.models.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    Publisher findByUser(User user);
}
