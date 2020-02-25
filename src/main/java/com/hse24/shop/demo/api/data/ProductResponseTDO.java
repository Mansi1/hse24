package com.hse24.shop.demo.api.data;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ProductResponseTDO implements Comparable<ProductResponseTDO> {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Long categoryId;
    private String image;

    @Override
    public int compareTo(ProductResponseTDO o) {
        return Long.compare(this.id, o.id);
    }
}
