package com.hse24.shop.demo.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.validation.constraints.NotEmpty;

@Data
@Configuration
@ConfigurationProperties(prefix = "fixerio")
public class FixerioConfig {

    @NotEmpty
    private String apiKey;
}
