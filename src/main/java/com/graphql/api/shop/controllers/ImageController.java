package com.graphql.api.shop.controllers;

import com.graphql.api.shop.models.Image;
import com.graphql.api.shop.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PreAuthorize("hasAuthority('ROLE_PUBLISHER')")
    @PostMapping
    public ResponseEntity<HttpStatus> uploadImage(@RequestParam MultipartFile image) {
        try {
            imageService.saveImage(new Image(
                            image.getOriginalFilename(),
                            image.getBytes()
                    )
            );
        } catch (IOException exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImageById(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageService.findImageById(id).getBytes());
        } catch (Exception exception) {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}
