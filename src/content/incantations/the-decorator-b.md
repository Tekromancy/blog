---
title: "The Decorator"
description: "Layering untyped memory spells to enhance ancient functionality."
type: b
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Enchantment // Charm
formula: |
  /* Base invocation */
  base_spell() {
      putchar('F'); putchar('I'); putchar('R'); putchar('E');
  }
  
  /* Decorator adding elemental ice */
  ice_decorator(inner_spell) {
      putchar('I'); putchar('C'); putchar('E'); putchar('-');
      inner_spell();
  }
  
  /* Decorator adding void energy */
  void_decorator(inner_spell) {
      putchar('V'); putchar('O'); putchar('I'); putchar('D'); putchar('-');
      inner_spell();
  }
  
  cast_decorated() {
      /* To cast void-ice-fire in B, we pass the function pointer down */
      /* Since B doesn't natively do closures easily, we chain them explicitly */
      /* Note: B's lack of true closures means we just wrap calls directly or use globals */
      
      void_decorator(base_spell); /* Simplified chaining */
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
