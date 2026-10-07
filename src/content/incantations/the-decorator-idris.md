---
title: "The Decorator: Layered Enchantments"
description: "Dynamically adding responsibilities and wards to an entity."
type: idris
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  module Decorator
  
  interface Enchantment e where
    cast : e -> String
  
  data BaseSpell = MkBaseSpell
  Enchantment BaseSpell where
    cast _ = "Fireball"
  
  -- Decorators
  data Empowered : Type -> Type where
    MkEmpowered : Enchantment e => e -> Empowered e
  
  Enchantment (Empowered e) where
    cast (MkEmpowered inner) = cast inner ++ " (Empowered)"
  
  data Echoing : Type -> Type where
    MkEchoing : Enchantment e => e -> Echoing e
  
  Enchantment (Echoing e) where
    cast (MkEchoing inner) = cast inner ++ " " ++ cast inner
tags: [structural, composition, higher-kinded-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator pattern envelops a core spell within concentric layers of esoteric power. Rather than constructing a monolithic matrix for every possible spell variation, Idris utilizes type wrappers—`Empowered` or `Echoing`—to augment the fundamental magic. The Theorem Proving Pacts verify that these ethereal skins adhere to the `Enchantment` contract, wrapping safety around immense destructive potential.
