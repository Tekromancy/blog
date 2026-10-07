---
title: The Strategy
description: Swappable targeting algorithms for a homing magic missile, allowing the caster to switch between tracking heat or tracking magic auras.
type: inform7
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Prose-Based Spellcasting"
formula: |2
  A targeting-mode is a kind of value. The targeting-modes are heat-seeking and aura-tracking.
  
  The magic missile is a thing. The magic missile has a targeting-mode called the flight path.
  
  To launch the magic missile:
      if the flight path of the magic missile is heat-seeking:
          say "The missile arcs toward the warmest body in the room!";
      otherwise if the flight path of the magic missile is aura-tracking:
          say "The missile aggressively locks onto the nearest magical resonance!"
          
  To switch the targeting of the missile to (mode - a targeting-mode):
      now the flight path of the magic missile is the mode;
      say "The missile's rune shifts, changing its targeting algorithm."
tags: [behavioral, evocation, strategy, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
