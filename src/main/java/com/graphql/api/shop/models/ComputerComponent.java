package com.graphql.api.shop.models;

import com.graphql.api.shop.models.base.BaseItem;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ComputerComponent extends BaseItem {
    String companyName;
    @ManyToMany
    List<Category> categories;
    @OneToMany(mappedBy = "computerComponent")
    List<Image> images;

    @ManyToOne
    Publisher publisher;

    public ComputerComponent(String name, String description, BigDecimal price, String companyName) {
        super(name, description, price);
        this.companyName = companyName;
    }

    public ComputerComponent(String name, String description, BigDecimal price, String companyName, List<Category> categories) {
        super(name, description, price);
        this.companyName = companyName;
        this.categories = categories;
    }
}
