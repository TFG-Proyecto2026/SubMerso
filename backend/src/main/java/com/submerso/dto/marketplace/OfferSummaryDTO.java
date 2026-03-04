package com.submerso.dto.marketplace;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OfferSummaryDTO {

    private String id;
    private String title;
    private String category;
    private Double price;
    private String currency;
    private String city;
    private String country;
    private String imageUrl;
    private Double rating;
    private Integer reviewCount;
    private String centerName;
    private Boolean centerVerified;
    private Integer durationMinutes;
}
