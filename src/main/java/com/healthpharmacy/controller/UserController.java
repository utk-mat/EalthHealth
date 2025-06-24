package com.healthpharmacy.controller;

import com.healthpharmacy.entity.User;
import com.healthpharmacy.payload.UserResponse;
import com.healthpharmacy.security.JwtTokenProvider;
import com.healthpharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

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

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable String id, @RequestBody User userDetails, @RequestHeader("Authorization") String token) {
        System.out.println("Received update profile request for ID: " + id);
        System.out.println("User details received: " + userDetails);
        System.out.println("Authorization token: " + token);
        try {
            String userIdFromToken = extractUserIdFromToken(token);
            System.out.println("User ID from token: " + userIdFromToken);
            if (!userIdFromToken.equals(id)) {
                System.err.println("Authorization error: Token user ID does not match path ID.");
                return ResponseEntity.status(403).body("You are not authorized to update this profile.");
            }

            User existingUser = userService.getUserById(id);
            System.out.println("Existing user found: " + existingUser);
            existingUser.setName(userDetails.getName());
            existingUser.setPhone(userDetails.getPhone());
            existingUser.setAddress(userDetails.getAddress());

            User updatedUser = userService.updateUser(existingUser);
            System.out.println("User updated successfully in DB: " + updatedUser);
            return ResponseEntity.ok(new UserResponse(updatedUser));
        } catch (RuntimeException e) {
            System.err.println("Error updating user profile: " + e.getMessage());
            e.printStackTrace(); // Print full stack trace for detailed error
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable String id, @RequestHeader("Authorization") String token) {
        try {
            String userIdFromToken = extractUserIdFromToken(token);
            if (!userIdFromToken.equals(id)) {
                return ResponseEntity.status(403).body("You are not authorized to view this profile.");
            }
            User user = userService.getUserById(id);
            return ResponseEntity.ok(new UserResponse(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 