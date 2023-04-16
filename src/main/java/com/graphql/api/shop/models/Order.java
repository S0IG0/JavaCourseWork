package com.graphql.api.shop.models;

import com.graphql.api.shop.models.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "orders")
public class Order extends BaseEntity {
    @CreatedDate
    private Date createDate = new Date();
    @OneToOne
    private Customer customer;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    List<RelationOrdersToComputerComponents> relationOrdersToComputerComponents;

    public Order(Customer customer) {
        this.customer = customer;
    }

    public Order(Customer customer, List<RelationOrdersToComputerComponents> relationOrdersToComputerComponents) {
        this.customer = customer;
        this.relationOrdersToComputerComponents = relationOrdersToComputerComponents;
    }
}
