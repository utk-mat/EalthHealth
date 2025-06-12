package com.healthpharmacy.config;

import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public void run(String... args) {
        // Only initialize if no medicines exist
        if (medicineRepository.count() == 0) {
            List<Medicine> medicines = Arrays.asList(
                createMedicine(
                    "Paracetamol 500mg",
                    "Effective pain reliever and fever reducer",
                    new BigDecimal("5.99"),
                    "Pain Relief",
                    false,
                    100,
                    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "ABC Pharmaceuticals",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "500mg"
                ),
                createMedicine(
                    "Vitamin C 1000mg",
                    "Supports immune system and overall health",
                    new BigDecimal("12.99"),
                    "Vitamins",
                    false,
                    50,
                    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "Health Plus",
                    LocalDate.now().plusYears(1),
                    "Capsule",
                    "1000mg"
                ),
                createMedicine(
                    "Amoxicillin 250mg",
                    "Antibiotic for bacterial infections",
                    new BigDecimal("15.99"),
                    "Antibiotics",
                    true,
                    75,
                    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "MediCorp",
                    LocalDate.now().plusYears(1),
                    "Capsule",
                    "250mg"
                ),
                createMedicine(
                    "Ibuprofen 400mg",
                    "Anti-inflammatory pain reliever",
                    new BigDecimal("8.99"),
                    "Pain Relief",
                    false,
                    60,
                    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "PainFree Inc",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "400mg"
                ),
                createMedicine(
                    "Cetirizine 10mg",
                    "Antihistamine for allergy relief",
                    new BigDecimal("7.99"),
                    "Allergies",
                    false,
                    90,
                    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "AllerCare",
                    LocalDate.now().plusYears(1),
                    "Tablet",
                    "10mg"
                )
            );

            medicineRepository.saveAll(medicines);
        }
    }

    private Medicine createMedicine(
        String name,
        String description,
        BigDecimal price,
        String category,
        boolean requiresPrescription,
        int stock,
        String imageUrl,
        String manufacturer,
        LocalDate expiryDate,
        String dosageForm,
        String strength
    ) {
        Medicine medicine = new Medicine();
        medicine.setName(name);
        medicine.setDescription(description);
        medicine.setPrice(price);
        medicine.setCategory(category);
        medicine.setRequiresPrescription(requiresPrescription);
        medicine.setStock(stock);
        medicine.setImageUrl(imageUrl);
        medicine.setManufacturer(manufacturer);
        medicine.setExpiryDate(expiryDate);
        medicine.setDosageForm(dosageForm);
        medicine.setStrength(strength);
        return medicine;
    }
} 