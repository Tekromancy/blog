---
title: The Decorator
description: Attaches additional arcane properties to an object dynamically.
type: tcl
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  oo::class create BaseArmor {
      method defend {} { return 10 }
      method describe {} { return "Standard Leather" }
  }

  oo::class create ArmorDecorator {
      variable armor
      constructor {a} { set armor $a }
      method defend {} { return [$armor defend] }
      method describe {} { return [$armor describe] }
  }

  oo::class create CyberPlating {
      superclass ArmorDecorator
      method defend {} { return [expr {[$armor defend] + 15}] }
      method describe {} { return "[$armor describe] with Neon Cyber-Plating" }
  }

  set myArmor [BaseArmor new]
  set myArmor [CyberPlating new $myArmor]

  puts "Armor: [$myArmor describe]"
  puts "Defense: [$myArmor defend]"
tags: [structural, decorator, enchantment, augmentation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Decorator

Sometimes a ward needs a little extra kick—a sudden injection of volatile mana or a stealth coating of void-stuff. The Decorator layers these enchantments dynamically at runtime, stacking protective matrices around the core payload without mutating its original structure.
