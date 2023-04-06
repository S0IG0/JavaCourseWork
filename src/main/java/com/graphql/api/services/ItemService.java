package com.graphql.api.services;

import com.graphql.api.models.Item;

import java.util.List;

public interface ItemService {
    public List<Item> findAllItems();
}
