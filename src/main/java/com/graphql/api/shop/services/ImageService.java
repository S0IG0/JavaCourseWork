package com.graphql.api.shop.services;

import com.graphql.api.shop.models.Image;

public interface ImageService {
    Image saveImage(Image image);
    Image findImageById(Long id);
}
