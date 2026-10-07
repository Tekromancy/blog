---
title: The Bridge
description: Decouples the physical form of a wand from its elemental core, allowing both to vary independently.
type: inform7
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Enchantment // Prose-Based Spellcasting"
formula: |2
  An elemental core is a kind of thing.
  A fire core is a kind of elemental core.
  A frost core is a kind of elemental core.
  
  To ignite (core - a fire core):
      say "Flames burst forth from the core."
      
  To ignite (core - a frost core):
      say "A chilling aura emanates from the core."
      
  A wand is a kind of thing. A wand has an elemental core called the embedded core.
  A wand has a text called the wood type.
  
  To wave (W - a wand):
      say "You wave the wand of [wood type of W].";
      ignite the embedded core of W.
tags: [structural, enchantment, bridge, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
