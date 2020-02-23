package com.hse24.shop.demo.api;

import com.hse24.shop.demo.api.data.ProductRequestTDO;
import com.hse24.shop.demo.api.data.ProductResponseTDO;
import com.hse24.shop.demo.business.ProductController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController()
@RequestMapping(path = "/api/product", produces = "application/json")
public class ProductRestController {

    private ProductController controller;

    @Autowired
    public ProductRestController(ProductController controller) {
        this.controller = controller;
    }

    @GetMapping(path = "/{id}")
    public ProductResponseTDO getProductById(@PathVariable(name = "id") Long id) {
        return controller.getById(id);
    }

    @GetMapping(path = "/")
    public List<ProductResponseTDO> getAllProducts() {
        return controller.getAll();
    }

    @PutMapping(path = "/", consumes = "application/json")
    public ProductResponseTDO addProduct(@Valid @RequestBody ProductRequestTDO category) {
        return controller.add(category);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteProductById(@PathVariable(name = "id") Long id) {
        controller.delete(id);
    }

    @GetMapping(path = "/category/{categoryId}")
    public List<ProductResponseTDO> getProductsByCategory(@PathVariable(name = "categoryId") Long id) {
        return controller.getProductsByCategory(id);
    }
}

