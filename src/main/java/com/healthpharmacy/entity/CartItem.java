package com.healthpharmacy.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Document(collection = "cart_items")
public class CartItem {
    @Id
    private String id;

    private String cartId;

    @DBRef
    private Medicine medicine;

    @NotNull
    @Min(1)
    private Integer quantity;

    public CartItem() {
    }

    public CartItem(String cartId, Medicine medicine, Integer quantity) {
        this.cartId = cartId;
        this.medicine = medicine;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
} 