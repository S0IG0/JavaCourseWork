package com.graphql.api.shop.models;

import com.graphql.api.shop.models.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RelationOrdersToComputerComponents extends BaseEntity {
    @ManyToOne
    Order order;
    @ManyToOne
    ComputerComponent computerComponent;
    Long count = 1L;

    public RelationOrdersToComputerComponents(ComputerComponent computerComponent) {
        this.computerComponent = computerComponent;
    }

    public RelationOrdersToComputerComponents(Order order, ComputerComponent computerComponent) {
        this.order = order;
        this.computerComponent = computerComponent;
    }
}
