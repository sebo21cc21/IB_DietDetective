package com.example.dietdetectivespring.preference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreferenceService {

    private final PreferenceRepository preferenceRepository;

    @Autowired
    public PreferenceService(PreferenceRepository preferenceRepository) {
        this.preferenceRepository = preferenceRepository;
    }

    public List<Preference> getAllPreferences() {
        return preferenceRepository.findAll();
    }

    public Preference getPreferenceById(Integer id) {
        return preferenceRepository.findById(id).orElse(null);
    }

    public Preference createPreference(Preference preference) {
        return preferenceRepository.save(preference);
    }

    public Preference updatePreference(Integer id, Preference preference) {
        Preference existingPreference = preferenceRepository.findById(id).orElse(null);
        if (existingPreference != null) {
            preference.setId(id);
            return preferenceRepository.save(preference);
        } else {
            return null;
        }
    }

    public boolean deletePreference(Integer id) {
        Preference existingPreference = preferenceRepository.findById(id).orElse(null);
        if (existingPreference != null) {
            preferenceRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
