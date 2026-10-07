---
title: Template Method for Sprite Enchantment
description: Define the skeletal framework of an enchantment ritual, allowing subclasses to flesh out the details.
type: gml
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Sprite Enchantment"
formula: |2
  function EnchantmentRitual() constructor {
      static perform_ritual = function(_x, _y) {
          prepare_circle(_x, _y);
          chant_words();
          ignite_sprite(_x, _y);
      };
      
      static prepare_circle = function(_x, _y) { /* base circle */ };
      static chant_words = function() {}; // Hook to override
      static ignite_sprite = function(_x, _y) {}; // Hook to override
  }
  
  function ShadowRitual() : EnchantmentRitual() constructor {
      static chant_words = function() { show_debug_message("Tenebris..."); };
      static ignite_sprite = function(_x, _y) { draw_sprite(spr_shadow, 0, _x, _y); };
  }
tags: [gml, behavioral, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method enforces ritualistic purity. The grand spell always flows in the same sequence: prepare, chant, ignite. However, shadow weavers or light bearers may infuse their specific incantations into the empty hooks, ensuring the ritual's integrity is preserved.
