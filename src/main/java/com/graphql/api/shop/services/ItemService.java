package com.graphql.api.shop.services;

import com.graphql.api.shop.models.Item;

import java.util.List;

public interface ItemService {
    List<Item> findAllItems();
    Item createItem(Item item);
}
