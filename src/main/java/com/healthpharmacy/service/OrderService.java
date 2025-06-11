package com.healthpharmacy.service;

import com.healthpharmacy.entity.Order;
import com.healthpharmacy.entity.OrderItem;
import com.healthpharmacy.entity.User;
import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MedicineService medicineService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUserId(user.getId());
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order createOrder(Order order) {
        // Validate stock and update quantities
        for (Medicine medicine : order.getMedicines()) {
            // If you need quantity, you may need to change the structure to use OrderItem
            // medicineService.updateStock(medicine.getId(), -quantity);
        }

        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        if (status.equals("DELIVERED")) {
            // order.setDeliveryDate(LocalDateTime.now()); // Uncomment if you add deliveryDate field
        }
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public List<Order> getOrdersByUserAndStatus(User user, String status) {
        return orderRepository.findByUserIdAndStatus(user.getId(), status);
    }

    @Transactional
    public void cancelOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if (!order.getStatus().equals("DELIVERED")) {
            // Return items to stock
            for (Medicine medicine : order.getMedicines()) {
                // medicineService.updateStock(medicine.getId(), quantity);
            }
            order.setStatus("CANCELLED");
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Cannot cancel a delivered order");
        }
    }
} 