package com.healthpharmacy.controller;

import com.healthpharmacy.entity.Cart;
import com.healthpharmacy.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(@RequestAttribute("userId") String userId) {
        return ResponseEntity.ok(cartService.getOrCreateCart(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<Cart> addItemToCart(
            @RequestAttribute("userId") String userId,
            @RequestParam String medicineId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addItemToCart(userId, medicineId, quantity));
    }

    @PutMapping("/items/{medicineId}")
    public ResponseEntity<Cart> updateItemQuantity(
            @RequestAttribute("userId") String userId,
            @PathVariable String medicineId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(userId, medicineId, quantity));
    }

    @DeleteMapping("/items/{medicineId}")
    public ResponseEntity<Cart> removeItemFromCart(
            @RequestAttribute("userId") String userId,
            @PathVariable String medicineId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(userId, medicineId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@RequestAttribute("userId") String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
} 