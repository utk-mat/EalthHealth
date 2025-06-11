package com.healthpharmacy.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import javax.crypto.SecretKey;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Base64;
import java.util.Arrays;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    private final SecretKey jwtSecretKey;
    private final byte[] jwtSecretBytes;

    public JwtTokenProvider(@Value("${app.jwtSecret}") String jwtSecret) {
        this.jwtSecretBytes = Base64.getDecoder().decode(jwtSecret);
        this.jwtSecretKey = Keys.hmacShaKeyFor(this.jwtSecretBytes);
        logger.info("JwtTokenProvider initialized. Instance Hash: {}, Secret Key Hash: {}, Raw Bytes: {}", 
                    this.hashCode(), jwtSecretKey.hashCode(), Arrays.toString(this.jwtSecretBytes));
    }

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        logger.info("Generating token for user: {}", userPrincipal.getUsername());
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtSecretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public SecretKey getJwtSecretKey() {
        return jwtSecretKey;
    }

    public byte[] getJwtSecretBytes() {
        return jwtSecretBytes;
    }

    public boolean validateToken(String authToken) {
        logger.info("Validating token: {}", authToken);
        logger.info("Using secret key for validation (Base64 encoded): {}", Base64.getEncoder().encodeToString(this.jwtSecretBytes));
        logger.info("Validation call. Instance Hash: {}, Secret Key Hash: {}, Raw Bytes: {}", 
                    this.hashCode(), jwtSecretKey.hashCode(), Arrays.toString(this.jwtSecretBytes));
        try {
            Jwts.parserBuilder()
                .setSigningKey(jwtSecretKey)
                .build()
                .parseClaimsJws(authToken);
            logger.info("Token validation successful.");
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty");
        }
        return false;
    }
} 