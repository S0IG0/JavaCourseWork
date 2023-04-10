package com.graphql.api.shop.controllers;

import com.graphql.api.shop.models.Item;
import com.graphql.api.shop.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.List;

@Component
@Controller
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService ItemService) {
        this.itemService = ItemService;
    }

    @QueryMapping
    public List<Item> findAllItems() {
        return itemService.findAllItems();
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @MutationMapping
    public Item createItem(@Argument Item item) {
        return itemService.createItem(item);
    }
}
