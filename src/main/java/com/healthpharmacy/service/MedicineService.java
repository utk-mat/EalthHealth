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
} 