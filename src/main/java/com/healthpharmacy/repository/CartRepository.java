package com.healthpharmacy.repository;

import com.healthpharmacy.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByUserIdAndIsActive(String userId, Boolean isActive);
    void deleteByUserId(String userId);
} 