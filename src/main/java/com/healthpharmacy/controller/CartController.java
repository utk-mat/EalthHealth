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
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        String userId = authentication.getName();
        logger.info("Fetching cart for user: {}", userId);
        Cart cart = cartService.getCart(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/items")
    public ResponseEntity<Cart> addToCart(
            Authentication authentication,
            @RequestParam String medicineId,
            @RequestParam(defaultValue = "1") int quantity) {
        String userId = authentication.getName();
        logger.info("Adding medicine {} (quantity: {}) to cart for user: {}", medicineId, quantity, userId);
        Cart cart = cartService.addItemToCart(userId, medicineId, quantity);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/items")
    public ResponseEntity<Cart> updateCartItemQuantity(
            Authentication authentication,
            @RequestParam String medicineId,
            @RequestParam int quantity) {
        String userId = authentication.getName();
        logger.info("Updating quantity of medicine {} to {} for user: {}", medicineId, quantity, userId);
        Cart cart = cartService.updateItemQuantity(userId, medicineId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/items/{medicineId}")
    public ResponseEntity<Cart> removeFromCart(
            Authentication authentication,
            @PathVariable String medicineId) {
        String userId = authentication.getName();
        logger.info("Removing medicine {} from cart for user: {}", medicineId, userId);
        Cart cart = cartService.removeItemFromCart(userId, medicineId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        String userId = authentication.getName();
        logger.info("Clearing cart for user: {}", userId);
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
} 