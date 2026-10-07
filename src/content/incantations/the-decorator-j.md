---
title: "The Decorator"
description: "Dynamically attaching additional magical properties to a base incantation."
type: j
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Aura Mancy"
formula: |2
  base_spell =: 3 : '''Missile'''
  
  empower =: 1 : 0
    'Empowered ' , u y
  )
  
  quicken =: 1 : 0
    'Quickened ' , u y
  )
  
  NB. Usage:
  NB. (base_spell empower quicken) ''
tags: [decorator, adverbs, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Adverbs and conjunctions natively "decorate" verbs in J, allowing composition of behaviors without modifying the original verb.
