---
title: The Decorator
description: Dynamically layer new magical properties onto an existing serpent.
type: vyper
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  # pragma version ^0.3.7
  
  interface ISerpent:
      def calculate_damage() -> uint256: view
  
  base_serpent: public(address)
  venom_multiplier: public(uint256)
  
  @external
  def __init__(_base: address, _multiplier: uint256):
      self.base_serpent = _base
      self.venom_multiplier = _multiplier
  
  @external
  @view
  def calculate_damage() -> uint256:
      # Retrieve base damage from the wrapped serpent
      base_damage: uint256 = ISerpent(self.base_serpent).calculate_damage()
      
      # Augment with the decorator's specific enchantment
      return base_damage * self.venom_multiplier
tags: [structural, decorator, vyper, enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Decorator** is a ritual of augmentation. Rather than rewriting the intrinsic DNA of a deployed Serpent contract, the adept summons a wrapper contract. This shell intercepts calls, invokes the original core, and amplifies the output with specialized runes—like acid-drip fangs or void-scales—stacking enchantments cleanly without bloating the base code.
