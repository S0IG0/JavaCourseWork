package com.graphql.api.shop.models;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.shop.models.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Customer extends BaseEntity {
    private String address;
    private String telephone;
    @OneToOne
    User user;
    @OneToOne(mappedBy = "customer", fetch = FetchType.EAGER)
    Order order;

    public Customer(String address, String telephone, User user) {
        this.address = address;
        this.telephone = telephone;
        this.user = user;
    }
}
