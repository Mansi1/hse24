package com.hse24.shop.demo.api.data;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class CategoryResponseTDO implements Comparable<CategoryResponseTDO> {

    private Long id;
    private String name;
    private String description;

    @Override
    public int compareTo(CategoryResponseTDO o) {
        return Long.compare(this.id, o.id);
    }
}
