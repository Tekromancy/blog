---
title: Abstract Factory for Sprite Enchantment
description: Conjure families of related sprite enchantments without knowing their concrete forms.
type: gml
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Sprite Enchantment"
formula: |2
  function EnchantmentFactory() constructor {
      static create_aura = function() {};
      static create_trail = function() {};
  }
  
  function FlameEnchantmentFactory() : EnchantmentFactory() constructor {
      static create_aura = function() { return new FlameAura(); };
      static create_trail = function() { return new FlameTrail(); };
  }
  
  function VoidEnchantmentFactory() : EnchantmentFactory() constructor {
      static create_aura = function() { return new VoidAura(); };
      static create_trail = function() { return new VoidTrail(); };
  }
tags: [gml, creational, sprite-enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Abstract Factory, an illusionist dictates the elemental affinity of their sprite manifestations globally, weaving cohesive visual effects without hardcoding the elemental incantations into every rendering routine.
