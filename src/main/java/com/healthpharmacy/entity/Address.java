package com.healthpharmacy.entity;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;
// import jakarta.validation.constraints.NotBlank;

public class Address {
    // @Id
    // private String id;

    // @NotBlank
    // private String userId; // Reference to User

    // @NotBlank
    private String street;

    // @NotBlank
    private String city;

    // @NotBlank
    private String state;

    private String zipCode;

    public Address() {}

    // public String getId() { return id; }
    // public void setId(String id) { this.id = id; }

    // public String getUserId() { return userId; }
    // public void setUserId(String userId) { this.userId = userId; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
}