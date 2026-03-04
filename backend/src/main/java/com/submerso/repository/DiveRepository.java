package com.submerso.repository;

import com.submerso.model.Dive;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiveRepository extends MongoRepository<Dive, String> {

    List<Dive> findByUserIdOrderByDiveDateDesc(String userId);
}
