package com.healthpharmacy.service;

import com.healthpharmacy.entity.Medicine;
import com.healthpharmacy.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public List<Medicine> getAvailableMedicines() {
        return medicineRepository.findByStockGreaterThan(0);
    }

    public List<Medicine> searchMedicines(String query) {
        return medicineRepository.findByNameContainingIgnoreCase(query);
    }

    public List<Medicine> getMedicinesByCategory(String category) {
        return medicineRepository.findByCategory(category);
    }

    public Optional<Medicine> getMedicineById(String id) {
        return medicineRepository.findById(id);
    }

    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public void deleteMedicine(String id) {
        medicineRepository.deleteById(id);
    }

    public List<Medicine> getMedicinesRequiringPrescription() {
        return medicineRepository.findByRequiresPrescription(true);
    }

    public void updateStock(String medicineId, int quantity) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        medicine.setStock(medicine.getStock() + quantity);
        medicineRepository.save(medicine);
    }

    public List<Medicine> getFeaturedMedicines() {
        // For simplicity, return the first 8 medicines as featured
        List<Medicine> allMedicines = medicineRepository.findAll();
        return allMedicines.subList(0, Math.min(8, allMedicines.size()));
    }

    public List<Medicine> getSortedMedicines(String sortBy, String sortDirection) {
        List<Medicine> medicines = medicineRepository.findAll();
        
        switch (sortBy.toLowerCase()) {
            case "name":
                medicines.sort((m1, m2) -> sortDirection.equalsIgnoreCase("asc") 
                    ? m1.getName().compareTo(m2.getName())
                    : m2.getName().compareTo(m1.getName()));
                break;
            case "price":
                medicines.sort((m1, m2) -> sortDirection.equalsIgnoreCase("asc")
                    ? m1.getPrice().compareTo(m2.getPrice())
                    : m2.getPrice().compareTo(m1.getPrice()));
                break;
            case "category":
                medicines.sort((m1, m2) -> sortDirection.equalsIgnoreCase("asc")
                    ? m1.getCategory().compareTo(m2.getCategory())
                    : m2.getCategory().compareTo(m1.getCategory()));
                break;
            default:
                // Default sort by name ascending
                medicines.sort((m1, m2) -> m1.getName().compareTo(m2.getName()));
        }
        
        return medicines;
    }
} 