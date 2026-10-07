---
title: "The Memento of Chronomancy"
description: "Capturing and restoring the internal state of a spellbook through time."
type: lua
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Transmutation // Chronomancy"
formula: |2
  local Spellbook = { activeSpell = "None" }

  function Spellbook:save()
    return { state = self.activeSpell }
  end

  function Spellbook:restore(memento)
    self.activeSpell = memento.state
  end

  Spellbook.activeSpell = "Fireball"
  local timeCrystal = Spellbook:save()

  Spellbook.activeSpell = "Invisibility"
  Spellbook:restore(timeCrystal)
  print("Restored Spell: " .. Spellbook.activeSpell)
tags: [fae, memento, state-saving]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Memento

Chronomancy demands precision. The Memento pattern captures a snapshot of a Lua table's essence—crystallizing its state at a specific moment. This time crystal can be safely held by the host engine and later crushed to restore the spellbook exactly as it was.
