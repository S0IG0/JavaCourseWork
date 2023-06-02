package com.graphql.api.shop.services.impl;

import com.graphql.api.shop.models.ComputerComponent;
import com.graphql.api.shop.models.Image;
import com.graphql.api.shop.repositories.ComputerComponentRepository;
import com.graphql.api.shop.services.ComputerComponentService;
import com.graphql.api.shop.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComputerComponentServiceImpl implements ComputerComponentService {
    private final ComputerComponentRepository computerComponentRepository;
    private final ImageService imageService;

    @Autowired
    public ComputerComponentServiceImpl(ComputerComponentRepository computerComponentRepository, ImageService imageService) {
        this.computerComponentRepository = computerComponentRepository;
        this.imageService = imageService;
    }

    @Override
    public List<ComputerComponent> saveAllComputerComponents(List<ComputerComponent> computerComponents) {
        for (int i = 0; i < computerComponents.size(); i++) {
            Image previewImage = computerComponents.get(i).getPreviewImage();
            List<Image> images = computerComponents.get(i).getImages();
            computerComponents.get(i).setImages(null);
            computerComponents.get(i).setPreviewImage(null);
            computerComponents.set(i, computerComponentRepository.save(computerComponents.get(i)));
            for (Image image : images) {
                image.setComputerComponent(computerComponents.get(i));
            }
            previewImage.setComputerComponent(computerComponents.get(i));
            computerComponents.get(i).setImages(imageService.saveAllImages(images));
            computerComponents.get(i).setPreviewImage(imageService.saveImage(previewImage));
            computerComponents.set(i, computerComponentRepository.save(computerComponents.get(i)));
        }
        return computerComponents;
    }

    @Override
    public ComputerComponent findComputerComponentById(Long id) {
        return computerComponentRepository.findById(id).orElse(null);
    }

    @Override
    public ComputerComponent saveComputerComponent(ComputerComponent computerComponent) {
        return null;
    }

    @Override
    public List<ComputerComponent> findAllComputerComponents() {
        return computerComponentRepository.findAll();
    }
}
