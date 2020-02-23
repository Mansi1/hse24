package com.hse24.shop.demo.business;

import com.hse24.shop.demo.api.data.ProductRequestTDO;
import com.hse24.shop.demo.api.data.ProductResponseTDO;
import com.hse24.shop.demo.business.exception.ResourceNotFoundException;
import com.hse24.shop.demo.business.mapper.ProductMapper;
import com.hse24.shop.demo.store.repository.CategoryRepository;
import com.hse24.shop.demo.store.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Controller
public class ProductController {

    private ProductRepository repository;
    private CategoryRepository categoryRepository;

    @Autowired
    public ProductController(ProductRepository repository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductResponseTDO> getAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(ProductMapper::fromEntity).sorted()
                .collect(Collectors.toList());
    }

    public List<ProductResponseTDO> getProductsByCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).map(entity -> StreamSupport.stream(repository.findProductEntitiesByCategory(entity).spliterator(), false)
                .map(ProductMapper::fromEntity).sorted()
                .collect(Collectors.toList())
        ).orElseThrow(() -> new ResourceNotFoundException(String.format("No category with id %d found.", categoryId)));
    }

    public ProductResponseTDO add(ProductRequestTDO product) {
        return ProductMapper.fromEntity(repository.save(ProductMapper.fromDTO(product)));
    }

    public ProductResponseTDO getById(Long id) {
        return repository.findById(id)
                .map(ProductMapper::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No product with id %d found.", id)));

    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(String.format("Product with id %d does not exist", id));
        }
    }
}
