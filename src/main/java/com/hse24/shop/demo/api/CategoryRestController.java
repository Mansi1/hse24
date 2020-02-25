package com.hse24.shop.demo.api;

import com.hse24.shop.demo.api.data.CategoryRequestTDO;
import com.hse24.shop.demo.api.data.CategoryResponseTDO;
import com.hse24.shop.demo.business.CategoryController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController()
@RequestMapping(path = "/api/category", produces = "application/json")
public class CategoryRestController {

    private CategoryController controller;

    @Autowired
    public CategoryRestController(CategoryController controller) {
        this.controller = controller;
    }

    @GetMapping(path = "/{id}")
    public CategoryResponseTDO getCategoryById(@PathVariable(name = "id") Long id) {

        return controller.getById(id);
    }

    @GetMapping(path = "/")
    public List<CategoryResponseTDO> getAllCategories() {
        return controller.getAll();
    }


    @PutMapping(path = "/", consumes = "application/json")
    public CategoryResponseTDO addCategory(@Valid @RequestBody CategoryRequestTDO category) {
        return controller.add(category);
    }

    @PutMapping(path = "/{id}", consumes = "application/json")
    public CategoryResponseTDO updateCategory(@PathVariable(name = "id") Long id, @Valid @RequestBody CategoryRequestTDO category) {
        return controller.update(id, category);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCategoryById(@PathVariable(name = "id") Long id) {
        controller.delete(id);
    }


}

