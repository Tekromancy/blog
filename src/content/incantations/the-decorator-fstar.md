---
title: The Decorator of Enchanted Weapons
description: Dynamically adding magical properties to items.
type: fstar
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enchanting"
formula: |2
  module Decorator
  
  type weapon = { damage: nat; name: string }
  
  let base_sword : weapon = { damage = 10; name = "Iron Sword" }
  
  let flaming_enchantment (w: weapon) : weapon =
    { damage = w.damage + 5; name = "Flaming " ^ w.name }
    
  let holy_enchantment (w: weapon) : weapon =
    { damage = w.damage + 10; name = "Holy " ^ w.name }
tags: [decorator, enchanting, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Enhancing artifacts by wrapping their representations with pure functions, guaranteeing that enhancements strictly increase damage.
