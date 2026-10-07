---
title: The Chrono-Crystal
description: Capture and restore the internal state of a magical entity without violating its encapsulation.
type: dart
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Divination // Chronomancy
formula: |
  class ChronoCrystal {
    final String _state;
    ChronoCrystal(this._state);
    String get savedState => _state;
  }
  
  class TimeWizard {
    String state = 'Healthy';
    
    ChronoCrystal saveToCrystal() => ChronoCrystal(state);
    
    void restoreFromCrystal(ChronoCrystal crystal) {
      state = crystal.savedState;
      print('Time rewound. State: $state');
    }
  }
  
  class TimelineVault {
    final List<ChronoCrystal> _history = [];
    
    void save(ChronoCrystal crystal) => _history.add(crystal);
    ChronoCrystal undo() => _history.removeLast();
  }
  
  void main() {
    final wizard = TimeWizard();
    final vault = TimelineVault();
    
    vault.save(wizard.saveToCrystal());
    wizard.state = 'Poisoned by Basilisk';
    print('Current: ${wizard.state}');
    
    wizard.restoreFromCrystal(vault.undo());
  }
tags: [dart, memento, state-restoration, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Chronomancy is dangerous if external forces tamper with the timestream. The Memento allows an object to snapshot its own state into an impenetrable Chrono-Crystal. The Vault holds the crystal but cannot alter it, ensuring flawless temporal restoration.
