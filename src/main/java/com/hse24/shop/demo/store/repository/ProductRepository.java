package com.hse24.shop.demo.store.repository;

import com.hse24.shop.demo.store.entity.CategoryEntity;
import com.hse24.shop.demo.store.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<ProductEntity, Long> {
    Iterable<ProductEntity> findProductEntitiesByCategory(CategoryEntity entity);
}
