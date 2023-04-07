package com.graphql.api.services.impl;

import com.graphql.api.models.Item;
import com.graphql.api.repositories.ItemRepository;
import com.graphql.api.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item createItem(Item item) {
        return itemRepository.save(item);
    }
}
