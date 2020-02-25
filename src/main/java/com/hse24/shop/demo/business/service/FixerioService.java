package com.hse24.shop.demo.business.service;

import com.hse24.shop.demo.business.exception.UnknownCurrencyException;
import com.hse24.shop.demo.config.FixerioConfig;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class FixerioService {

    private final FixerioConfig config;

    @Autowired
    public FixerioService(FixerioConfig config) {
        this.config = config;
    }


    public Double getExchangeRateToEuro(String currency) {
        return Optional.of(new RestTemplate())
                .map(rt -> rt.getForObject(
                        String.format("http://data.fixer.io/api/latest?access_key=%s&format=1", config.getApiKey()), FixerioResponseTO.class))
                .map(response -> response.rates)
                .map(rates -> rates.get(currency))
                .orElseThrow(() -> new UnknownCurrencyException(String.format("Unable to find exchange rate for supplied currency %s", currency)));
    }

    @Data
    public static class FixerioResponseTO {
        private Boolean success;
        private Long timestamp;
        private String base;
        private Date date;
        private Map<String, Double> rates;
    }
}
