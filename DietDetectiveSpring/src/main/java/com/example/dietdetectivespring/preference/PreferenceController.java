package com.example.dietdetectivespring.preference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/preferences")
public class PreferenceController {

    private final PreferenceService preferenceService;

    @Autowired
    public PreferenceController(PreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    @GetMapping
    public ResponseEntity<List<Preference>> getAllPreferences() {
        List<Preference> preferences = preferenceService.getAllPreferences();
        return new ResponseEntity<>(preferences, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Preference> getPreferenceById(@PathVariable Integer id) {
        Preference preference = preferenceService.getPreferenceById(id);
        if (preference != null) {
            return new ResponseEntity<>(preference, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Preference> createPreference(@RequestBody Preference preference) {
        Preference createdPreference = preferenceService.createPreference(preference);
        return new ResponseEntity<>(createdPreference, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Preference> updatePreference(@PathVariable Integer id, @RequestBody Preference preference) {
        Preference updatedPreference = preferenceService.updatePreference(id, preference);
        if (updatedPreference != null) {
            return new ResponseEntity<>(updatedPreference, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePreference(@PathVariable Integer id) {
        boolean deleted = preferenceService.deletePreference(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
