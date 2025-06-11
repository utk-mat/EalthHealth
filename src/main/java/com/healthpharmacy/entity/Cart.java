package com.healthpharmacy.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "carts")
public class Cart {
    @Id
    private String id;

    private String userId;

    @DBRef
    private List<CartItem> items = new ArrayList<>();

    private BigDecimal totalAmount;

    public Cart() {
    }

    public Cart(String userId) {
        this.userId = userId;
        this.totalAmount = BigDecimal.ZERO;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void calculateTotal() {
        this.totalAmount = items.stream()
                .map(item -> item.getMedicine().getPrice().multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
} 