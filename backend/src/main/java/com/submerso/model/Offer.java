package com.submerso.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "offers")
@CompoundIndex(name = "category_price_rating", def = "{'category': 1, 'price': 1, 'rating': -1}")
@CompoundIndex(name = "city_available_rating",  def = "{'city': 1, 'available': 1, 'rating': -1}")
public class Offer {

    @Id
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

    @CreatedDate
    private LocalDateTime createdAt;
}
