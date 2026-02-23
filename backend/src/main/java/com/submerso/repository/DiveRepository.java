package com.submerso.repository;

import com.submerso.model.Dive;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiveRepository extends MongoRepository<Dive, String> {
}
