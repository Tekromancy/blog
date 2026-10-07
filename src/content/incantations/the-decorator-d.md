---
title: Decorator
description: Dynamically attach new magical properties and modifiers to an existing spell without altering its fundamental structure.
type: d
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Spell Modification"
formula: |2
  interface ICastable { int power(); }

  class BaseSpell : ICastable {
      override int power() { return 10; }
  }

  abstract class SpellModifier : ICastable {
      protected ICastable baseCast;
      this(ICastable b) { baseCast = b; }
      override int power() { return baseCast.power(); }
  }

  class EmpowerModifier : SpellModifier {
      this(ICastable b) { super(b); }
      override int power() { return baseCast.power() + 5; }
  }
tags: [structural, decorator, dlang, augmentation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Wrap enchantments in layers of volatile metaprogramming enhancements.
