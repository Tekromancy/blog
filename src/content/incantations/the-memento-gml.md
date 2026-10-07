---
title: Memento for Sprite Enchantment
description: Capture and restore the fleeting internal state of an enchanted sprite.
type: gml
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Sprite Enchantment"
formula: |2
  function SpriteStateMemento(_color, _alpha) constructor {
      saved_color = _color;
      saved_alpha = _alpha;
  }
  
  function EnchantedSprite() constructor {
      color = c_white;
      alpha = 1.0;
      
      static save_state = function() {
          return new SpriteStateMemento(color, alpha);
      };
      
      static restore_state = function(_memento) {
          color = _memento.saved_color;
          alpha = _memento.saved_alpha;
      };
  }
tags: [gml, behavioral, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento is pure Chronomancy. Before subjecting a sprite to dangerous transmutations, its essence is saved within an opaque crystal (the memento). If the enchantment destabilizes, the sprite's purity can be restored instantly, without exposing its internal parameters to the void.
