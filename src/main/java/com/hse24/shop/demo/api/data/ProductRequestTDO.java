package com.hse24.shop.demo.api.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestTDO {
    @NotEmpty
    private String name;
    @NotNull
    private Double price;
    @NotNull
    private Long categoryId;
    @NotEmpty
    @Size(min = 3, max = 3)
    private String currency;
    private String description;
    private String image;
}
