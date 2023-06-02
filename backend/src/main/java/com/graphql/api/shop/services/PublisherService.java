package com.graphql.api.shop.services;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.shop.models.Publisher;

public interface PublisherService {
    Publisher savePublisher(Publisher publisher);
    Publisher findPublisherByUser(User user);
}
