package com.hse24.shop.demo.config;

import com.hse24.shop.demo.OnlineStoreApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(ApiInfo info) {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage(OnlineStoreApplication.class.getPackageName()))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(info);
    }

    @Bean
    public ApiInfo metaData() {
        return new ApiInfo(
                "HSE24 REST API",
                "Spring Boot REST API for HSE24 Online Store",
                "1.0",
                "put here your hse24 terms of service ...",
                new Contact("Michael Mannseicher", "https://noturl.com", "m.mansi1@gmx.net"),
                "Apache License Version 2.0",
                "https://www.apache.org/licenses/LICENSE-2.0",
                List.of()
        );
    }
}
