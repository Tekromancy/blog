---
title: The Decorator of Wards and Runes
description: Dynamically attach magical properties to artifacts using layered rules.
type: prolog
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Abjuration // Runemancy
formula: |
  % Base Component
  artifact_power(base_amulet, 10).
  
  % Decorator: Add Fire Resistance
  artifact_power(fire_warded(Artifact), TotalPower) :-
      artifact_power(Artifact, BasePower),
      TotalPower is BasePower + 15.
      
  % Decorator: Add Glowing Aura
  artifact_power(glowing(Artifact), TotalPower) :-
      artifact_power(Artifact, BasePower),
      TotalPower is BasePower + 5.
      
  % Applying decorators by wrapping terms
  % ?- artifact_power(glowing(fire_warded(base_amulet)), Power).
  % Power = 30.
tags: [decorator, structural, prolog, wrapper, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
