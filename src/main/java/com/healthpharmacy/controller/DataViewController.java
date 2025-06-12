package com.healthpharmacy.controller;

import com.healthpharmacy.entity.Cart;
import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.entity.User;
import com.healthpharmacy.repository.CartRepository;
import com.healthpharmacy.repository.MedicineRepository;
import com.healthpharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class DataViewController {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/view")
    public ResponseEntity<Map<String, Object>> viewData() {
        Map<String, Object> data = new HashMap<>();
        
        // Get all medicines
        List<Medicine> medicines = medicineRepository.findAll();
        data.put("medicines", medicines);
        
        // Get all users (excluding sensitive information)
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setPassword(null)); // Remove password for security
        data.put("users", users);
        
        // Get all carts
        List<Cart> carts = cartRepository.findAll();
        data.put("carts", carts);
        
        // Add counts
        data.put("totalMedicines", medicines.size());
        data.put("totalUsers", users.size());
        data.put("totalCarts", carts.size());
        
        return ResponseEntity.ok(data);
    }
} 