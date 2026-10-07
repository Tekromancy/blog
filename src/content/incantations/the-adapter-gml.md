---
title: Adapter for Sprite Enchantment
description: Translate legacy elemental arrays into modern sprite enchantment nodes.
type: gml
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Sprite Enchantment"
formula: |2
  // Legacy System
  function OldSpriteMagic() constructor {
      static cast_spell = function(_id, _r, _g, _b) {
          // Old rendering logic
      };
  }
  
  // Modern Interface
  function EnchantmentAdapter(_old_magic) constructor {
      legacy_magic = _old_magic;
      
      static apply_enchantment = function(_target, _color) {
          var r = color_get_red(_color);
          var g = color_get_green(_color);
          var b = color_get_blue(_color);
          legacy_magic.cast_spell(_target, r, g, b);
      };
  }
tags: [gml, structural, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter acts as a Rosetta Stone for magics of old. When ancient grimoires dictate sprite coloring through disparate RGB parameters, the Adapter unifies them into a single, cohesive hex color standard fit for modern transmutations.
