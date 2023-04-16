package com.graphql.api.shop.controllers;

import com.graphql.api.shop.models.Publisher;
import com.graphql.api.shop.services.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Component
@Controller
public class PublisherController {
    private final PublisherService publisherService;

    @Autowired
    public PublisherController(PublisherService publisherService) {
        this.publisherService = publisherService;
    }
    @MutationMapping
    public Publisher createPublisher(@Argument Publisher publisher) {
        return publisherService.savePublisher(publisher);
    }
}
