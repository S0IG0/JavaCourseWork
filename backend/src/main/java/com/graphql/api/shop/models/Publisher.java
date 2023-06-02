package com.graphql.api.shop.models;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.shop.models.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Publisher extends BaseEntity {
    private String nameCompany;
    private String addressCompany;
    private String activitiesCompany;
    private String positionInCompany;
    @OneToOne
    User user;
    @OneToMany(mappedBy = "publisher")
    List<ComputerComponent> computerComponents;
}
