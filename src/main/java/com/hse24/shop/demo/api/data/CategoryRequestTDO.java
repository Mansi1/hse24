package com.hse24.shop.demo.api.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequestTDO {
    @NotEmpty
    private String name;
    private String description;
}
