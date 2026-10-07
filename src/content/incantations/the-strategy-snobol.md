---
title: The Strategy of Snobol
description: Swapping out the underlying mechanics of a spell on the fly.
type: snobol
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Casting"
formula: |2
          * Strategy Pattern in SNOBOL4
          DEFINE('ATTACK(STRATEGY)')

          ATTACK('FIRE_STRATEGY')
          ATTACK('ICE_STRATEGY')
          :(END)

  ATTACK
          EVAL(STRATEGY '()') :(RETURN)

  FIRE_STRATEGY
          OUTPUT = 'Casting a volatile burst of flame!' :(RETURN)

  ICE_STRATEGY
          OUTPUT = 'Unleashing a piercing shard of frost!' :(RETURN)
  END
tags: [snobol, behavioral, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Strategy separates the intent from the method. By passing the name of the algorithmic incantation as a string, the caster can dynamically swap whether they wish to use fire or ice, evaluating the chosen method at runtime.
