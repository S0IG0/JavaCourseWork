package com.graphql.api.shop.services;

import com.graphql.api.shop.models.Image;

import java.util.List;

public interface ImageService {
    Image saveImage(Image image);
    List<Image> saveAllImages(List<Image> images);
    Image findImageById(Long id);
}
