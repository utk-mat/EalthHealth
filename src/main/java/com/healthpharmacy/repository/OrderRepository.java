package com.healthpharmacy.repository;

import com.healthpharmacy.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
    List<Order> findByStatus(String status);
    List<Order> findByUserIdAndStatus(String userId, String status);
} 