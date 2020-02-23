package com.hse24.shop.demo.business.mapper;

import com.hse24.shop.demo.api.data.CategoryRequestTDO;
import com.hse24.shop.demo.api.data.CategoryResponseTDO;
import com.hse24.shop.demo.api.data.ProductRequestTDO;
import com.hse24.shop.demo.api.data.ProductResponseTDO;
import com.hse24.shop.demo.store.entity.CategoryEntity;
import com.hse24.shop.demo.store.entity.ProductEntity;

public class ProductMapper {

    public static ProductResponseTDO fromEntity(ProductEntity entity) {
        return ProductResponseTDO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .image(entity.getImageUrl())
                .build();
    }

    public static ProductEntity fromDTO(ProductRequestTDO dto) {
        return ProductEntity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .imageUrl(dto.getImage())
                .build();
    }
}
