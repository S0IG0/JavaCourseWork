package com.graphql.api.shop.services.impl;

import com.graphql.api.shop.models.RelationOrdersToComputerComponents;
import com.graphql.api.shop.repositories.RelationOrdersToComputerComponentsRepository;
import com.graphql.api.shop.services.RelationOrdersToComputerComponentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RelationOrdersToComputerComponentsServiceImpl implements RelationOrdersToComputerComponentsService {
    private final RelationOrdersToComputerComponentsRepository relationOrdersToComputerComponentsRepository;

    @Autowired
    public RelationOrdersToComputerComponentsServiceImpl(
            RelationOrdersToComputerComponentsRepository relationOrdersToComputerComponentsRepository
    ) {
        this.relationOrdersToComputerComponentsRepository = relationOrdersToComputerComponentsRepository;
    }

    @Override
    public RelationOrdersToComputerComponents saveRelation(RelationOrdersToComputerComponents relation) {
        return relationOrdersToComputerComponentsRepository.save(relation);
    }
}
