package com.graphql.api.shop.models;

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
public class Image extends BaseEntity {
    private String name;
    @Lob
    private byte[] bytes;

    @ManyToOne(fetch = FetchType.EAGER)
    ComputerComponent computerComponent;

    public Image(String name, byte[] bytes) {
        this.name = name;
        this.bytes = bytes;
    }
}
