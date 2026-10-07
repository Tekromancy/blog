---
title: Factory Method
description: Delegating the specific nature of a century-long enchantment to subclasses.
type: raku
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Transmutation // Genesis"
formula: |2
  role Enchantment {
      method cast() { ... }
  }

  class HundredYearSleep does Enchantment {
      method cast() { say "The subject falls into a slumber until a century has passed." }
  }

  class HundredYearVigil does Enchantment {
      method cast() { say "A stone gargoyle awakens to guard the keep for 100 years." }
  }

  role SpellCrafter {
      method create-enchantment(--> Enchantment) { ... }
      
      method invoke() {
          my $ench = self.create-enchantment();
          say "Preparing the ceremonial circles...";
          $ench.cast();
      }
  }

  class SleepCrafter does SpellCrafter {
      method create-enchantment(--> Enchantment) { HundredYearSleep.new }
  }

  class VigilCrafter does SpellCrafter {
      method create-enchantment(--> Enchantment) { HundredYearVigil.new }
  }

  my SpellCrafter $crafter = SleepCrafter.new;
  $crafter.invoke();
tags: [creational, factory-method, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The core invocation ritual is always the same: drawing circles, burning incense, and chanting the old words. But the spell born of the ritual differs. The Factory Method allows our `SpellCrafter` to dictate the shared process while leaving the exact nature of the Hundred-Year Enchantment to specific crafter lineages.
