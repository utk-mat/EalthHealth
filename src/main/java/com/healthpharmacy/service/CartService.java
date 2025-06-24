package com.healthpharmacy.service;

import com.healthpharmacy.entity.Cart;
import com.healthpharmacy.entity.CartItem;
import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.repository.CartRepository;
import com.healthpharmacy.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MedicineService medicineService;

    public Cart getOrCreateActiveCart(String userId) {
        Optional<Cart> activeCart = cartRepository.findByUserIdAndIsActive(userId, true);
        return activeCart.orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            newCart.setActive(true);
            return cartRepository.save(newCart);
        });
    }

    public Cart addMedicineToCart(String userId, String medicineId, int quantity) {
        Cart cart = getOrCreateActiveCart(userId);
        Medicine medicine = medicineService.getMedicineById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        Optional<CartItem> existingCartItem = cart.getItems().stream()
                .filter(item -> item.getMedicine().getId().equals(medicineId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem item = existingCartItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            CartItem newCartItem = new CartItem(medicine, quantity);
            cartItemRepository.save(newCartItem);
            cart.getItems().add(newCartItem);
        }
        return cartRepository.save(cart);
    }

    public Cart updateCartItemQuantity(String userId, String cartItemId, int quantity) {
        Cart cart = getOrCreateActiveCart(userId);
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getItems().contains(cartItem)) {
            throw new RuntimeException("Cart item does not belong to the user's active cart");
        }

        if (quantity <= 0) {
            cart.getItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }
        return cartRepository.save(cart);
    }

    public void removeCartItem(String userId, String cartItemId) {
        Cart cart = getOrCreateActiveCart(userId);
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getItems().contains(cartItem)) {
            throw new RuntimeException("Cart item does not belong to the user's active cart");
        }

        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        Cart cart = getOrCreateActiveCart(userId);
        cart.getItems().forEach(cartItemRepository::delete);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public void deactivateCart(String userId) {
        Optional<Cart> activeCart = cartRepository.findByUserIdAndIsActive(userId, true);
        if (activeCart.isPresent()) {
            Cart cart = activeCart.get();
            cart.setActive(false);
            cartRepository.save(cart);
        }
    }

    public Optional<Cart> getCartById(String cartId) {
        return cartRepository.findById(cartId);
    }

    public Optional<Cart> getActiveCartByUserId(String userId) {
        return cartRepository.findByUserIdAndIsActive(userId, true);
    }
}