---
title: Chain of Responsibility for Sprite Enchantment
description: Pass a magical request along a chain of potential enchanting wards.
type: gml
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Sprite Enchantment"
formula: |2
  function EnchantmentHandler() constructor {
      next_handler = undefined;
      
      static set_next = function(_handler) {
          next_handler = _handler;
          return _handler;
      };
      
      static handle_spell = function(_spell_type, _sprite) {
          if (next_handler != undefined) {
              next_handler.handle_spell(_spell_type, _sprite);
          }
      };
  }
  
  function FireWard() : EnchantmentHandler() constructor {
      static handle_spell = function(_spell_type, _sprite) {
          if (_spell_type == "fire") {
              _sprite.color = c_red;
          } else if (next_handler != undefined) {
              next_handler.handle_spell(_spell_type, _sprite);
          }
      };
  }
tags: [gml, behavioral, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Chain of Responsibility, an incoming enchantment cascades through a sequence of wards. If a ward resonates with the incoming energy (like a FireWard detecting fire), it alters the sprite; otherwise, it defers to the next mystical node in the chain.
