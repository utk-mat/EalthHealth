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

    @DBRef
    private Medicine medicine;

    @NotNull
    @Min(1)
    private Integer quantity;

    public CartItem() {
    }

    public CartItem(Medicine medicine, Integer quantity) {
        this.medicine = medicine;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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