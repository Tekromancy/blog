---
title: Builder for Sprite Enchantment
description: Construct complex, layered sprite enchantments step by step.
type: gml
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Sprite Enchantment"
formula: |2
  function SpriteEnchantmentBuilder() constructor {
      sprite_target = noone;
      color_blend = c_white;
      alpha_level = 1.0;
      glow_radius = 0;
      
      static set_target = function(_sprite) { sprite_target = _sprite; return self; };
      static set_blend = function(_color) { color_blend = _color; return self; };
      static set_glow = function(_radius) { glow_radius = _radius; return self; };
      
      static build = function() {
          return new EnchantedSprite(sprite_target, color_blend, alpha_level, glow_radius);
      };
  }
tags: [gml, creational, builder, sprite-enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder pattern breaks down the complex ritual of enchanting a sprite into sequential steps. Rather than invoking a colossal summoning function with myriad arguments, the transmuter applies colors, opacities, and auras methodically before finalizing the spell.
