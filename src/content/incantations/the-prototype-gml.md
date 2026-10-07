---
title: Prototype for Sprite Enchantment
description: Copy fully formed sprite enchantments without reconstructing them from scratch.
type: gml
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Sprite Enchantment"
formula: |2
  function EnchantmentPrototype(_color, _intensity) constructor {
      color = _color;
      intensity = _intensity;
      
      static clone = function() {
          return new EnchantmentPrototype(color, intensity);
      };
  }
  
  // Usage
  var master_rune = new EnchantmentPrototype(c_fuchsia, 0.8);
  var duplicated_rune = master_rune.clone();
tags: [gml, creational, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype is the art of magical duplication. Instead of performing a strenuous ritual anew, a spellcaster takes an existing sprite effect and clones its memory, tweaking only minor parameters if necessary.
