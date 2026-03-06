package com.submerso.service;

import com.submerso.dto.common.PagedResponse;
import com.submerso.dto.marketplace.OfferDetailDTO;
import com.submerso.dto.marketplace.OfferSummaryDTO;
import com.submerso.model.Offer;
import com.submerso.repository.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final MongoTemplate mongoTemplate;
    private final OfferRepository offerRepository;

    public PagedResponse<OfferSummaryDTO> searchOffers(
            String q,
            String category,
            String city,
            Double maxPrice,
            Double minRating,
            Boolean verifiedOnly,
            int page,
            int size,
            String sort) {

        List<Criteria> criteriaList = new ArrayList<>();
        criteriaList.add(Criteria.where("available").is(true));

        if (q != null && !q.isBlank()) {
            criteriaList.add(new Criteria().orOperator(
                    Criteria.where("title").regex(q, "i"),
                    Criteria.where("description").regex(q, "i"),
                    Criteria.where("tags").regex(q, "i")
            ));
        }
        if (category != null && !category.isBlank()) {
            criteriaList.add(Criteria.where("category").is(category));
        }
        if (city != null && !city.isBlank()) {
            criteriaList.add(Criteria.where("city").regex(city, "i"));
        }
        if (maxPrice != null) {
            criteriaList.add(Criteria.where("price").lte(maxPrice));
        }
        if (minRating != null) {
            criteriaList.add(Criteria.where("rating").gte(minRating));
        }
        if (Boolean.TRUE.equals(verifiedOnly)) {
            criteriaList.add(Criteria.where("centerVerified").is(true));
        }

        Criteria finalCriteria = new Criteria().andOperator(criteriaList.toArray(new Criteria[0]));
        Sort mongoSort = buildSort(sort);

        Query countQuery = new Query(finalCriteria);
        long total = mongoTemplate.count(countQuery, Offer.class);

        Query dataQuery = new Query(finalCriteria)
                .with(mongoSort)
                .skip((long) page * size)
                .limit(size);

        List<Offer> offers = mongoTemplate.find(dataQuery, Offer.class);
        List<OfferSummaryDTO> dtos = offers.stream().map(this::toSummaryDTO).toList();

        return new PagedResponse<>(dtos, page, size, total);
    }

    private Sort buildSort(String sort) {
        return switch (sort != null ? sort : "newest") {
            case "price_asc"  -> Sort.by(Sort.Direction.ASC,  "price");
            case "price_desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "rating"     -> Sort.by(Sort.Direction.DESC, "rating");
            default           -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
    }

    private OfferSummaryDTO toSummaryDTO(Offer offer) {
        return OfferSummaryDTO.builder()
                .id(offer.getId())
                .title(offer.getTitle())
                .category(offer.getCategory())
                .price(offer.getPrice())
                .currency(offer.getCurrency() != null ? offer.getCurrency() : "EUR")
                .city(offer.getCity())
                .country(offer.getCountry())
                .imageUrl(offer.getImageUrl())
                .rating(offer.getRating())
                .reviewCount(offer.getReviewCount())
                .centerName(offer.getCenterName())
                .centerVerified(offer.getCenterVerified())
                .durationMinutes(offer.getDurationMinutes())
                .build();
    }

    public Optional<OfferDetailDTO> getOfferById(String id) {
        return offerRepository.findById(id).map(this::toDetailDTO);
    }

    private OfferDetailDTO toDetailDTO(Offer offer) {
        return OfferDetailDTO.builder()
                .id(offer.getId())
                .title(offer.getTitle())
                .description(offer.getDescription())
                .tags(offer.getTags())
                .category(offer.getCategory())
                .price(offer.getPrice())
                .currency(offer.getCurrency() != null ? offer.getCurrency() : "EUR")
                .city(offer.getCity())
                .country(offer.getCountry())
                .imageUrl(offer.getImageUrl())
                .rating(offer.getRating())
                .reviewCount(offer.getReviewCount())
                .centerId(offer.getCenterId())
                .centerName(offer.getCenterName())
                .centerVerified(offer.getCenterVerified())
                .available(offer.getAvailable())
                .maxParticipants(offer.getMaxParticipants())
                .durationMinutes(offer.getDurationMinutes())
                .build();
    }
}
