---
title: The Factory Method of Snobol
description: Creating magical entities using string patterns.
type: snobol
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Evocation"
formula: |2
          * Factory Method in SNOBOL4
          DEFINE('SUMMON(TYPE)')

          OUTPUT = SUMMON('DEMON')
          OUTPUT = SUMMON('ANGEL')
          :(END)

  SUMMON
          SUMMON = IDENT(TYPE, 'DEMON') 'Summoned a minor demon' :S(RETURN)
          SUMMON = IDENT(TYPE, 'ANGEL') 'Summoned a lesser angel' :S(RETURN)
          SUMMON = 'Failed to summon' :(RETURN)
  END
tags: [snobol, creational, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the magical arts, a Factory Method allows the conjurer to specify a type, and the spell handles the intricate conditional branching needed to manifest the correct entity.
