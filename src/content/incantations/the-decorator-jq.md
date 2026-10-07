---
title: The Decorator (jq)
description: Dynamically weave new enchantments onto existing data structures.
type: jq
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  # Base component
  def base_signal:
    { "data": "raw_feed", "cost": 10 };

  # Decorators
  def with_encryption:
    .data |= "ENCRYPTED(" + . + ")" | .cost += 15;
    
  def with_compression:
    .data |= "COMPRESS(" + . + ")" | .cost += 5;

  # Applying decorators dynamically
  base_signal | with_encryption | with_compression
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Why lock a structure into rigid subclassing when you can augment it on the fly? The **Decorator** pattern chains mutations across the JSON stream. Each decorator captures the object, alters its state or wraps its payload, and passes it forward. The final construct is a stack of harmonized enchantments.
