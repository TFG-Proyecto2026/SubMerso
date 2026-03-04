package com.submerso.repository;

import com.submerso.model.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends MongoRepository<Offer, String> {

    boolean existsByTitle(String title);
}
