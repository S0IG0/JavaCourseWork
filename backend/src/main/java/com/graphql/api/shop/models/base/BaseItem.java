package com.graphql.api.shop.models.base;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BaseItem extends BaseEntity {
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private BigDecimal price;
}
