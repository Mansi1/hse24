package com.hse24.shop.demo.business;

import com.hse24.shop.demo.api.data.ProductRequestTDO;
import com.hse24.shop.demo.api.data.ProductResponseTDO;
import com.hse24.shop.demo.business.exception.ResourceNotFoundException;
import com.hse24.shop.demo.business.mapper.ProductMapper;
import com.hse24.shop.demo.business.service.FixerioService;
import com.hse24.shop.demo.store.entity.CategoryEntity;
import com.hse24.shop.demo.store.entity.ProductEntity;
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
    private FixerioService exchangeService;

    @Autowired
    public ProductController(ProductRepository repository, CategoryRepository categoryRepository, FixerioService exchangeService) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.exchangeService = exchangeService;
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

        ProductEntity productEntity = generateProductEntity(product);
        return ProductMapper.fromEntity(repository.save(productEntity));
    }

    public ProductResponseTDO update(Long id, ProductRequestTDO product) {
        return repository.findById(id)
                .map(entity -> {
                    ProductEntity productEntity = generateProductEntity(product);
                    productEntity.setId(entity.getId());
                    return productEntity;
                })
                .map(entity -> repository.save(entity))
                .map(ProductMapper::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Product to update %d not found", id)));
    }

    public ProductEntity generateProductEntity(ProductRequestTDO product) {
        CategoryEntity categoryEntity = categoryRepository.findById(product.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No category with id %d found.", product.getCategoryId())));

        //get exchange rate
        Double exchangeRateToEuro = 1d;
        if (!product.getCurrency().equals("EUR")) {
            exchangeRateToEuro = this.exchangeService.getExchangeRateToEuro(product.getCurrency());
        }
        ProductEntity productEntity = ProductMapper.fromDTO(product, product.getPrice() / exchangeRateToEuro);
        productEntity.setCategory(categoryEntity);

        return productEntity;
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
