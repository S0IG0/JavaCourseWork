package com.graphql.api.shop.models;

import com.graphql.api.shop.models.base.BaseItem;
import jakarta.persistence.*;
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
    @OneToMany(mappedBy = "computerComponent", fetch = FetchType.EAGER)
    List<Image> images;

    @OneToOne
    Image previewImage;

    @ManyToOne
    Publisher publisher;

    public ComputerComponent(
            String name,
            String description,
            BigDecimal price,
            String companyName,
            List<Category> categories,
            Image previewImage,
            List<Image> images
    ) {
        super(name, description, price);
        this.companyName = companyName;
        this.categories = categories;
        this.previewImage = previewImage;
        this.images = images;
    }
}
