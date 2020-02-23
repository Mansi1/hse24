package com.hse24.shop.demo.business.mapper;

import com.hse24.shop.demo.api.data.CategoryRequestTDO;
import com.hse24.shop.demo.api.data.CategoryResponseTDO;
import com.hse24.shop.demo.store.entity.CategoryEntity;

public class CategoryMapper {

    public static CategoryResponseTDO fromEntity(CategoryEntity entity) {
        return CategoryResponseTDO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .build();
    }

    public static CategoryEntity fromDTO(CategoryRequestTDO dto) {
        return CategoryEntity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
    }
}
