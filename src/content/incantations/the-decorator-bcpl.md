---
title: The Decorator of Abyssal Veils
description: Dynamically weave additional enchantments onto an underlying void-spell without altering its core structure.
type: bcpl
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enchantment"
formula: |2
  GET "libhdr"

  // Base spell
  LET CastBaseSpell() = VALOF $(
    writef("Casting Base Void Bolt")
    RESULTIS 50
  $)

  // Decorator: Adds Shadow damage
  LET AddShadowVeil(baseFunc) = VALOF $(
    LET dmg = baseFunc()
    writef(" + Shadow Veil")
    RESULTIS dmg + 20
  $)

  // Decorator: Adds Soul Drain
  LET AddSoulDrain(baseDmg) = VALOF $(
    writef(" + Soul Drain")
    RESULTIS baseDmg + 30
  $)

  LET START() BE $(
    LET dmg = CastBaseSpell()
    writef(" -> Total Damage: %d*n", dmg)

    writef("Decorated Spell:*n")
    // In BCPL we can compose these functionally by passing the result
    LET d1 = CastBaseSpell()
    writef(" + Shadow Veil")
    d1 := d1 + 20
    writef(" + Soul Drain")
    d1 := d1 + 30
    writef(" -> Total Damage: %d*n", d1)
  $)
tags: [decorator, enchantment, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
