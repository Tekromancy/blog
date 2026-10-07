---
title: Flyweight for Sprite Enchantment
description: Share intrinsic enchanting states to render thousands of sprites without exhausting the magical reserves.
type: gml
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Enchantment // Sprite Enchantment"
formula: |2
  function EnchantmentCore(_sprite, _shader) constructor {
      // Intrinsic state shared among thousands
      sprite = _sprite;
      shader = _shader;
  }
  
  function EnchantedParticle(_core, _x, _y, _alpha) constructor {
      // Extrinsic state unique to each instance
      core = _core;
      x = _x;
      y = _y;
      alpha = _alpha;
      
      static draw = function() {
          shader_set(core.shader);
          draw_sprite_ext(core.sprite, 0, x, y, 1, 1, 0, c_white, alpha);
          shader_reset();
      };
  }
tags: [gml, structural, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Flyweight technique prevents the mana pool from running dry when conjuring vast swarms. The shared visual essence (sprite and shader) is held in a single core, while only positional coordinates drift with each individual mote of magic.
