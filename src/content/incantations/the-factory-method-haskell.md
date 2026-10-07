---
title: The Factory Method
description: Typeclass-driven conjuration, yielding polymorphic forms from the pure void.
type: haskell
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Voidmancy
formula: |
  module FactoryMethod where
  class Spell s where cast :: s -> String
  data Fireball = Fireball
  instance Spell Fireball where cast _ = "Fireball!"
  data Frostbolt = Frostbolt
  instance Spell Frostbolt where cast _ = "Frostbolt!"
tags: [typeclasses, factory, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
