---
title: The Visitor
description: A spectral auditor that travels through a dungeon, evaluating the structural integrity of different kinds of magical traps without modifying them.
type: inform7
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Prose-Based Spellcasting"
formula: |2
  A magical trap is a kind of thing.
  A fire-rune is a kind of magical trap. A pit-illusion is a kind of magical trap.
  
  The spectral auditor is a thing.
  
  To audit (rune - a fire-rune):
      say "The auditor inspects the fire-rune's ignition sequence... it is stable."
      
  To audit (pit - a pit-illusion):
      say "The auditor examines the pit-illusion's light-bending matrix... it flickers slightly."
      
  To send the auditor to (trap - a magical trap):
      [Polymorphic dispatch in Inform 7 via rulebooks or specific typed phrasing]
      if the trap is a fire-rune:
          audit the trap as a fire-rune;
      otherwise if the trap is a pit-illusion:
          audit the trap as a pit-illusion.
tags: [behavioral, divination, visitor, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
