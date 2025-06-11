package com.healthpharmacy.service;

import com.healthpharmacy.entity.Cart;
import com.healthpharmacy.entity.CartItem;
import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.entity.User;
import com.healthpharmacy.repository.CartRepository;
import com.healthpharmacy.repository.MedicineRepository;
import com.healthpharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Transactional
    public Cart getOrCreateCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    Cart cart = new Cart();
                    cart.setUserId(user.getId());
                    return cartRepository.save(cart);
                });
    }

    @Transactional
    public Cart addItemToCart(String userId, String medicineId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getMedicine().getId().equals(medicineId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCartId(cart.getId());
            newItem.setMedicine(medicine);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    @Transactional
    public Cart updateItemQuantity(String userId, String medicineId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().stream()
                .filter(item -> item.getMedicine().getId().equals(medicineId))
                .findFirst()
                .ifPresent(item -> {
                    if (quantity <= 0) {
                        cart.getItems().remove(item);
                    } else {
                        item.setQuantity(quantity);
                    }
                });

        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeItemFromCart(String userId, String medicineId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().removeIf(item -> item.getMedicine().getId().equals(medicineId));
        return cartRepository.save(cart);
    }

    @Transactional
    public void clearCart(String userId) {
        cartRepository.deleteByUserId(userId);
    }
} 