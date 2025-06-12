package com.healthpharmacy.controller;

import com.healthpharmacy.entity.Cart;
import com.healthpharmacy.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        String userId = authentication.getName();
        logger.info("Attempting to get cart for user: {}", userId);
        Cart cart = cartService.getOrCreateCart(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(
            Authentication authentication,
            @RequestParam String medicineId,
            @RequestParam(defaultValue = "1") int quantity) {
        String userId = authentication.getName();
        logger.info("Adding medicine {} (quantity: {}) to cart for user: {}", medicineId, quantity, userId);
        Cart cart = cartService.addToCart(userId, medicineId, quantity);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateCartItemQuantity(
            Authentication authentication,
            @RequestParam String medicineId,
            @RequestParam int quantity) {
        String userId = authentication.getName();
        logger.info("Updating quantity of medicine {} to {} for user: {}", medicineId, quantity, userId);
        Cart cart = cartService.updateCartItemQuantity(userId, medicineId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeFromCart(
            Authentication authentication,
            @RequestParam String medicineId) {
        String userId = authentication.getName();
        logger.info("Removing medicine {} from cart for user: {}", medicineId, userId);
        Cart cart = cartService.removeFromCart(userId, medicineId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        String userId = authentication.getName();
        logger.info("Clearing cart for user: {}", userId);
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
} 