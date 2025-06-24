package com.healthpharmacy.controller;

import com.healthpharmacy.entity.Cart;
import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.service.CartService;
import com.healthpharmacy.service.UserService;
import com.healthpharmacy.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String extractUserIdFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            String email = jwtTokenProvider.getUsernameFromToken(jwt);
            return userService.getUserByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found")).getId();
        }
        throw new RuntimeException("Invalid or missing token");
    }

    @GetMapping("/active")
    public ResponseEntity<Cart> getActiveCart(@RequestHeader("Authorization") String token) {
        String userId = extractUserIdFromToken(token);
        Optional<Cart> cart = cartService.getActiveCartByUserId(userId);
        return cart.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addMedicineToCart(
            @RequestHeader("Authorization") String token,
            @RequestParam String medicineId,
            @RequestParam int quantity) {
        String userId = extractUserIdFromToken(token);
        Cart updatedCart = cartService.addMedicineToCart(userId, medicineId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    @PutMapping("/updateItemQuantity")
    public ResponseEntity<Cart> updateCartItemQuantity(
            @RequestHeader("Authorization") String token,
            @RequestParam String cartItemId,
            @RequestParam int quantity) {
        String userId = extractUserIdFromToken(token);
        Cart updatedCart = cartService.updateCartItemQuantity(userId, cartItemId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/removeItem/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(
            @RequestHeader("Authorization") String token,
            @PathVariable String cartItemId) {
        String userId = extractUserIdFromToken(token);
        cartService.removeCartItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestHeader("Authorization") String token) {
        String userId = extractUserIdFromToken(token);
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
} 