---
title: Template Method
description: Defining the immutable skeletal framework of a century-long ritual.
type: raku
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritualism"
formula: |2
  role RitualTemplate {
      # The Template Method itself
      method perform-ritual() {
          self.draw-circle();
          self.invoke-power();
          self.seal-pact();
      }
      
      # Immutable steps
      method draw-circle() {
          say "Drawing the immutable century circle with chalk and salt.";
      }
      
      method seal-pact() {
          say "Sealing the spell with the caster's true name.";
      }
      
      # Step to be implemented by subclasses
      method invoke-power() { ... }
  }

  class BloodRitual does RitualTemplate {
      method invoke-power() {
          say "Invoking power via ancestral bloodlines.";
      }
  }

  class StarRitual does RitualTemplate {
      method invoke-power() {
          say "Invoking power by pulling down starlight.";
      }
  }

  my $ritual = StarRitual.new;
  $ritual.perform-ritual();
tags: [behavioral, template-method, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

There is a strict, unforgiving order to casting a Hundred-Year Spell. The circle must be drawn, power invoked, and the pact sealed. If the sequence is broken, the caster burns. The Template Method defines this exact skeletal framework in the base class, allowing apprentices to customize only the specific type of power being invoked without altering the critical sequence.
