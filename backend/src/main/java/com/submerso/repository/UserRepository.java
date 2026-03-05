package com.submerso.repository;

import com.submerso.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);
    
    Optional<User> findByRefreshToken(String refreshToken);
    
    Boolean existsByEmail(String email);
    
    Boolean existsByUsername(String username);
    
    @Query("{ '$or': [ { 'username': { '$regex': ?0, '$options': 'i' } }, { 'firstName': { '$regex': ?0, '$options': 'i' } }, { 'lastName': { '$regex': ?0, '$options': 'i' } } ] }")
    List<User> searchUsers(String query);
    
    List<User> findByIdIn(List<String> ids);
}
