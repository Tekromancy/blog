---
title: Command for Sprite Enchantment
description: Encapsulate an enchantment request as an object to be executed or undone.
type: gml
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Sprite Enchantment"
formula: |2
  function EnchantmentCommand() constructor {
      static execute = function() {};
      static undo = function() {};
  }
  
  function ColorShiftCommand(_sprite, _new_color) : EnchantmentCommand() constructor {
      target_sprite = _sprite;
      new_color = _new_color;
      old_color = _sprite.color;
      
      static execute = function() {
          target_sprite.color = new_color;
      };
      
      static undo = function() {
          target_sprite.color = old_color;
      };
  }
tags: [gml, behavioral, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command transforms an ethereal verb into a tangible noun. By encapsulating a color shift or scaling spell within a command artifact, a chronomancer can safely queue, delay, or perfectly invert enchantments cast upon a sprite.
