package com.healthpharmacy.controller;

import com.healthpharmacy.entity.User;
import com.healthpharmacy.payload.JwtAuthenticationResponse;
import com.healthpharmacy.payload.LoginRequest;
import com.healthpharmacy.payload.UserResponse;
import com.healthpharmacy.security.JwtTokenProvider;
import com.healthpharmacy.security.UserPrincipal;
import com.healthpharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userService.getUserById(userPrincipal.getId());
        UserResponse userResponse = new UserResponse(user);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, userResponse));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            String email = extractEmailFromToken(token);
            User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Return a UserResponse object instead of Optional<User>
            UserResponse userResponse = new UserResponse(user);
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Return error message as JSON
        }
    }

    private String extractEmailFromToken(String token) {
        // Remove "Bearer " prefix
        token = token.substring(7);
        return tokenProvider.getUsernameFromToken(token);
    }
} 