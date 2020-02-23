package com.hse24.shop.demo.store.repository;

import com.hse24.shop.demo.store.entity.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<CategoryEntity, Long> {
}
