---
title: The Monolith Soul
description: Ensure only a single instance of a magical conduit exists across the application.
type: dart
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Soul Binding"
formula: |2
  class ManaLeyline {
    static final ManaLeyline _instance = ManaLeyline._internal();

    int manaPool = 1000;

    // Factory constructor returns the same instance
    factory ManaLeyline() {
      return _instance;
    }

    // Private named constructor
    ManaLeyline._internal();

    void drawMana(int amount) {
      if (manaPool >= amount) {
        manaPool -= amount;
        print('Drew $amount mana. Remaining: $manaPool');
      } else {
        print('Mana depleted!');
      }
    }
  }

  void main() {
    final nexus1 = ManaLeyline();
    final nexus2 = ManaLeyline();

    nexus1.drawMana(200);
    nexus2.drawMana(300); // Draws from the same shared pool

    print(identical(nexus1, nexus2)); // true
  }
tags: [dart, singleton, state-management, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Some arcane structures are so potent that invoking more than one would tear the fabric of the application apart. The Singleton binds a singular soul to an instance. Dart’s `factory` constructors make this pattern elegantly invisible to the conjurer invoking it.
