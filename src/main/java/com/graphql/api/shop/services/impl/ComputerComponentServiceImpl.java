package com.graphql.api.shop.services.impl;

import com.graphql.api.shop.models.ComputerComponent;
import com.graphql.api.shop.repositories.ComputerComponentRepository;
import com.graphql.api.shop.services.ComputerComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComputerComponentServiceImpl implements ComputerComponentService {
    private final ComputerComponentRepository computerComponentRepository;
    @Autowired
    public ComputerComponentServiceImpl(ComputerComponentRepository computerComponentRepository) {
        this.computerComponentRepository = computerComponentRepository;
    }

    @Override
    public ComputerComponent saveComputerComponent(ComputerComponent computerComponent) {
        return null;
    }

    @Override
    public List<ComputerComponent> findAllComputerComponents() {
        return computerComponentRepository.findAll();
    }
}
