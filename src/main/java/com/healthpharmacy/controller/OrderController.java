package com.healthpharmacy.controller;

import com.healthpharmacy.entity.Order;
import com.healthpharmacy.entity.User;
import com.healthpharmacy.service.OrderService;
import com.healthpharmacy.service.UserService;
import com.healthpharmacy.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> getUserOrders(@RequestHeader("Authorization") String token) {
        try {
            String email = extractEmailFromToken(token);
            User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(orderService.getOrdersByUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(List.of());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order, @RequestHeader("Authorization") String token) {
        try {
            String email = extractEmailFromToken(token);
            User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            order.setUserId(user.getId());
            return ResponseEntity.ok(orderService.createOrder(order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String id, @RequestParam String status) {
        try {
            return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(status));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable String id) {
        try {
            orderService.cancelOrder(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private String extractEmailFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            return jwtTokenProvider.getUsernameFromToken(jwt);
        }
        throw new RuntimeException("Invalid or missing token");
    }
} 