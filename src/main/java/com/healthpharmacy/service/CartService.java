package com.healthpharmacy.service;

import com.healthpharmacy.entity.Cart;
import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.repository.CartRepository;
import com.healthpharmacy.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public Cart getOrCreateCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart(userId);
                    return cartRepository.save(newCart);
                });
    }

    public Cart addToCart(String userId, String medicineId, int quantity) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        Cart cart = getOrCreateCart(userId);
        Cart.CartItem newItem = new Cart.CartItem(medicine, quantity);

        // Check if item already exists in cart
        Optional<Cart.CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getMedicineId().equals(medicineId))
                .findFirst();

        if (existingItem.isPresent()) {
            // Update quantity if item exists
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            // Add new item if it doesn't exist
            cart.getItems().add(newItem);
        }

        // Update total
        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart updateCartItemQuantity(String userId, String medicineId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        
        cart.getItems().stream()
                .filter(item -> item.getMedicineId().equals(medicineId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));

        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart removeFromCart(String userId, String medicineId) {
        Cart cart = getOrCreateCart(userId);
        
        cart.getItems().removeIf(item -> item.getMedicineId().equals(medicineId));
        
        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        cartRepository.deleteByUserId(userId);
    }

    private void updateCartTotal(Cart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        cart.setTotal(total);
    }
} 