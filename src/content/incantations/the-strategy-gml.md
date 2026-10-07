---
title: Strategy for Sprite Enchantment
description: Interchange families of magical algorithms without disturbing the enchanted vessel.
type: gml
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Sprite Enchantment"
formula: |2
  function RenderingStrategy() constructor {
      static draw = function(_sprite, _x, _y) {};
  }
  
  function GhostlyStrategy() : RenderingStrategy() constructor {
      static draw = function(_sprite, _x, _y) {
          draw_sprite_ext(_sprite, 0, _x, _y, 1, 1, 0, c_white, 0.3);
      };
  }
  
  function SolidStrategy() : RenderingStrategy() constructor {
      static draw = function(_sprite, _x, _y) {
          draw_sprite(_sprite, 0, _x, _y);
      };
  }
  
  function SpriteVessel(_strategy) constructor {
      strategy = _strategy;
      static render = function(_sprite, _x, _y) {
          strategy.draw(_sprite, _x, _y);
      };
  }
tags: [gml, behavioral, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Strategy acts as a swappable grimoire. Instead of a single tome holding every known drawing method, a vessel accepts a specific manuscript at runtime—be it Ghostly or Solid—executing it to perfection without requiring the caster to rewrite the vessel's soul.
