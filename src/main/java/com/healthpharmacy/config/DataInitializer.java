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
                    "Dolo 650",
                    "Effective pain reliever and fever reducer",
                    new BigDecimal("25.00"),
                    "Pain Relief",
                    false,
                    100,
                    "/dolo.jpg",
                    "Micro Labs",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "650mg"
                ),
                createMedicine(
                    "Crocin Advance",
                    "Pain relief and fever reducer",
                    new BigDecimal("20.00"),
                    "Pain Relief",
                    false,
                    100,
                    "/crocin.jpg",
                    "GSK",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "500mg"
                ),
                createMedicine(
                    "Cetrizine",
                    "Antihistamine for cold, allergies and sneezing",
                    new BigDecimal("15.00"),
                    "Allergies",
                    false,
                    100,
                    "/cetrizene.jpg",
                    "Dr. Reddy's",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "10mg"
                ),
                createMedicine(
                    "Disprin",
                    "Headache, mild pain, cold symptoms relief",
                    new BigDecimal("12.00"),
                    "Pain Relief",
                    false,
                    100,
                    "/disprin.jpg",
                    "Bayer",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "325mg"
                ),
                createMedicine(
                    "Digene",
                    "Acidity, indigestion, and gas relief",
                    new BigDecimal("25.00"),
                    "Digestive Health",
                    false,
                    100,
                    "/digene.jpg",
                    "Abbott",
                    LocalDate.now().plusYears(2),
                    "Chewable Tablet",
                    "Standard"
                ),
                createMedicine(
                    "ORS Powder",
                    "Oral rehydration solution for dehydration and weakness",
                    new BigDecimal("10.00"),
                    "First Aid",
                    false,
                    100,
                    "/ors.jpg",
                    "Electral",
                    LocalDate.now().plusYears(2),
                    "Sachet",
                    "Standard"
                ),
                createMedicine(
                    "Zincovit",
                    "Multivitamin supplement for overall health",
                    new BigDecimal("50.00"),
                    "Vitamins",
                    false,
                    100,
                    "/zincovit.jpg",
                    "Alkem",
                    LocalDate.now().plusYears(2),
                    "Capsule",
                    "Standard"
                ),
                createMedicine(
                    "Calpol 650",
                    "Fever and pain relief (paracetamol)",
                    new BigDecimal("25.00"),
                    "Pain Relief",
                    false,
                    100,
                    "/calpol.jpg",
                    "GSK",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "650mg"
                ),
                createMedicine(
                    "Azee 500",
                    "Antibiotic for bacterial infections",
                    new BigDecimal("70.00"),
                    "Antibiotics",
                    true,
                    100,
                    "/azee.jpg",
                    "Cipla",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "500mg"
                ),
                createMedicine(
                    "Eldoper",
                    "Diarrhea control medication",
                    new BigDecimal("20.00"),
                    "Digestive Health",
                    true,
                    100,
                    "/eldoper.jpg",
                    "Torrent",
                    LocalDate.now().plusYears(2),
                    "Tablet",
                    "2mg"
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