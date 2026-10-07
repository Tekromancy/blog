---
title: The Astral Tether
description: Decouple an abstraction from its implementation so both can evolve independently.
type: dart
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Enchantment // Artifice"
formula: |2
  abstract class Enchantment {
    void applyMagic();
  }

  class FireEnchantment implements Enchantment {
    @override
    void applyMagic() => print('Wreathed in blazing hellfire!');
  }

  class FrostEnchantment implements Enchantment {
    @override
    void applyMagic() => print('Coated in absolute zero frost!');
  }

  abstract class Weapon {
    final Enchantment enchantment;
    Weapon(this.enchantment);
    void strike();
  }

  class CyberKatana extends Weapon {
    CyberKatana(super.enchantment);

    @override
    void strike() {
      print('Striking with Cyber Katana...');
      enchantment.applyMagic();
    }
  }

  void main() {
    final fireKatana = CyberKatana(FireEnchantment());
    fireKatana.strike();

    final frostKatana = CyberKatana(FrostEnchantment());
    frostKatana.strike();
  }
tags: [dart, bridge, composition, enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the number of weapon classes and enchantment classes grow out of control, combinatorial explosion ruins the armory. The Astral Tether (Bridge) separates the mystical essence (Enchantment) from the physical form (Weapon), weaving them together through composition rather than inheritance.
