package com.submerso.dto.marketplace;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OfferDetailDTO {

    private String id;
    private String title;
    private String description;
    private List<String> tags;
    private String category;
    private Double price;
    private String currency;
    private String city;
    private String country;
    private String imageUrl;
    private Double rating;
    private Integer reviewCount;
    private String centerId;
    private String centerName;
    private Boolean centerVerified;
    private Boolean available;
    private Integer maxParticipants;
    private Integer durationMinutes;
}
