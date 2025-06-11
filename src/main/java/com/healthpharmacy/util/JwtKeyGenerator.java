package com.healthpharmacy.util;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

public class JwtKeyGenerator {
    public static void main(String[] args) throws Exception {
        // Generate a secure random key
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA512");
        keyGen.init(512); // Use 512 bits for HS512
        SecretKey secretKey = keyGen.generateKey();
        
        // Convert to Base64 string
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        
        System.out.println("Generated JWT Secret Key:");
        System.out.println(encodedKey);
    }
} 