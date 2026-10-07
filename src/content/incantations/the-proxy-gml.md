---
title: Proxy for Sprite Enchantment
description: A spectral placeholder controlling access to a resource-heavy enchanted sprite.
type: gml
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Sprite Enchantment"
formula: |2
  function HeavyEnchantment() constructor {
      // Imagine loading a massive texture atlas here
      sprite_index = spr_massive_boss_aura;
      static draw = function(_x, _y) { draw_sprite(sprite_index, 0, _x, _y); };
  }
  
  function ProxyEnchantment() constructor {
      real_enchantment = undefined;
      
      static draw = function(_x, _y) {
          if (real_enchantment == undefined) {
              real_enchantment = new HeavyEnchantment(); // Lazy instantiation
          }
          real_enchantment.draw(_x, _y);
      };
  }
tags: [gml, structural, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy weaves an illusion of presence. It postpones the severe memory cost of heavy magical assets, materializing the true enchantment only at the precise moment it is required to be perceived by mortals.
