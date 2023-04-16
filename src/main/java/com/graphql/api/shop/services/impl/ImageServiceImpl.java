package com.graphql.api.shop.services.impl;

import com.graphql.api.shop.models.Image;
import com.graphql.api.shop.repositories.ImageRepository;
import com.graphql.api.shop.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Image findImageById(Long id) {
        return imageRepository.findById(id).orElse(null);
    }
}
