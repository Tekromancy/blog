---
title: Factory Method for Sprite Enchantment
description: Defer the exact manifestation of a sprite enchantment to subclasses.
type: gml
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Sprite Enchantment"
formula: |2
  function SpriteSpawner() constructor {
      static create_enchantment = function() { 
          // Abstract method, must be overridden by true conjurers
          return undefined; 
      };
      
      static spawn_and_apply = function(_target_x, _target_y) {
          var enchantment = create_enchantment();
          enchantment.apply_at(_target_x, _target_y);
      };
  }
  
  function CursedSpriteSpawner() : SpriteSpawner() constructor {
      static create_enchantment = function() {
          return new CursedEnchantment();
      };
  }
tags: [gml, creational, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By trusting the Factory Method, base rituals dictate the flow of summoning while specific covens override the exact essence spawned, ensuring variations of sprites seamlessly integrate into the grand orchestration.
