---
title: "The Strategy of the Spellbook"
description: "Choosing the method of attack dynamically at runtime from an arsenal of spells."
type: lua
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  local Strategies = {
    Fire = function() return "Casting a blistering fireball!" end,
    Ice = function() return "Unleashing a cone of frost!" end
  }

  local Wizard = {
    strategy = Strategies.Fire,
    cast = function(self) return self.strategy() end
  }

  print(Wizard:cast())
  Wizard.strategy = Strategies.Ice
  print(Wizard:cast())
tags: [fae, strategy, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Strategy

A master wizard does not lock themselves into a single invocation. The Strategy pattern stores different functions (spells) in a table. By swapping the active closure, the host engine can completely change the script's approach without modifying the wizard's core logic.
