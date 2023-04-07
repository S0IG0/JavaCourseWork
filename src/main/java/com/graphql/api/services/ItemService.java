package com.graphql.api.services;

import com.graphql.api.models.Item;

import java.util.List;

public interface ItemService {
    List<Item> findAllItems();
    Item createItem(Item item);
}
