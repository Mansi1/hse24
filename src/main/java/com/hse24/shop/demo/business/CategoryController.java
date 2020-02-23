package com.hse24.shop.demo.business;

import com.hse24.shop.demo.api.data.CategoryRequestTDO;
import com.hse24.shop.demo.api.data.CategoryResponseTDO;
import com.hse24.shop.demo.business.exception.ResourceAlreadyExistException;
import com.hse24.shop.demo.business.exception.ResourceNotFoundException;
import com.hse24.shop.demo.business.mapper.CategoryMapper;
import com.hse24.shop.demo.store.repository.CategoryRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Controller
public class CategoryController {

    private CategoryRepository repository;

    @Autowired
    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<CategoryResponseTDO> getAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(CategoryMapper::fromEntity).sorted()
                .collect(Collectors.toList());
    }

    public CategoryResponseTDO add(CategoryRequestTDO category) {
        try {
            return CategoryMapper.fromEntity(repository.save(CategoryMapper.fromDTO(category)));
        } catch (DataIntegrityViolationException e) {
            Throwable cause = e.getCause();
            if (cause instanceof ConstraintViolationException
                    && ((ConstraintViolationException) cause).getConstraintName().equals("category_name_key")) {
                throw new ResourceAlreadyExistException(String.format("Category with name %s already exist", category.getName()));
            }
            //do by global exception mapper
            throw e;
        }
    }

    public CategoryResponseTDO getById(Long id) {
        return repository.findById(id)
                .map(CategoryMapper::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No category with id %d found.", id)));

    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(String.format("Category with id %d does not exist", id));
        }
    }
}
