package com.hse24.shop.demo.business.mapper;

import com.hse24.shop.demo.api.data.ProductRequestTDO;
import com.hse24.shop.demo.api.data.ProductResponseTDO;
import com.hse24.shop.demo.store.entity.ProductEntity;

public class ProductMapper {

    public static ProductResponseTDO fromEntity(ProductEntity entity) {
        return ProductResponseTDO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .image(entity.getImageUrl())
                .categoryId(entity.getCategory().getId())
                .build();
    }

    public static ProductEntity fromDTO(ProductRequestTDO dto, Double priceInEuro) {
        return ProductEntity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .imageUrl(dto.getImage())
                .price(priceInEuro)
                .build();
    }
}
