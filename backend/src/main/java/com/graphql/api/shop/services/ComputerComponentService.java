package com.graphql.api.shop.services;

import com.graphql.api.shop.models.ComputerComponent;

import java.util.List;

public interface ComputerComponentService {
    ComputerComponent saveComputerComponent(ComputerComponent computerComponent);
    ComputerComponent findComputerComponentById(Long id);
    List<ComputerComponent> saveAllComputerComponents(List<ComputerComponent> computerComponents);
    List<ComputerComponent> findAllComputerComponents();
}
