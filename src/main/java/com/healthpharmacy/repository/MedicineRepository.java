package com.healthpharmacy.repository;

import com.healthpharmacy.entity.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {
    List<Medicine> findByCategory(String category);
    List<Medicine> findByNameContainingIgnoreCase(String name);
    List<Medicine> findByRequiresPrescription(boolean requiresPrescription);
    List<Medicine> findByStockGreaterThan(int stock);
} 