---
title: Singleton for Sprite Enchantment
description: Ensure a solitary locus for the administration of sprite enchantments.
type: gml
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Sprite Enchantment"
formula: |2
  function EnchantmentManager() constructor {
      active_enchantments = [];
      
      static get_instance = function() {
          static _instance = new EnchantmentManager();
          return _instance;
      };
      
      static register = function(_enchantment) {
          array_push(active_enchantments, _enchantment);
      };
  }
  
  // Invocation
  var manager = EnchantmentManager().get_instance();
tags: [gml, creational, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton binds the chaotic aether to a single focal point. Through this pattern, there is only one overseer of all sprite enchantments in the realm, preventing redundant magical conflicts.
