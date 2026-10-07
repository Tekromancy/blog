---
title: Bridge for Sprite Enchantment
description: Decouple the essence of an enchantment from the physical sprite it alters.
type: gml
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Alteration // Sprite Enchantment"
formula: |2
  function SpriteEntity(_enchantment) constructor {
      enchantment = _enchantment;
      static draw = function() {
          enchantment.render(self.x, self.y);
      };
  }
  
  function SpectralEnchantment() constructor {
      static render = function(_x, _y) {
          draw_sprite_ext(spr_ghostly, 0, _x, _y, 1, 1, 0, c_white, 0.5);
      };
  }
  
  function CrystallineEnchantment() constructor {
      static render = function(_x, _y) {
          draw_sprite_ext(spr_crystal, 0, _x, _y, 1, 1, 0, c_aqua, 1.0);
      };
  }
tags: [gml, structural, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Through the Bridge, we separate the 'what' from the 'how'. A sprite entity merely acts as the anchor, while the bridging enchantment interface handles the profound aesthetic rendering. One can swap a spectral visage for a crystalline shell without disrupting the physical anchor.
