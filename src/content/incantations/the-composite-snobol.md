---
title: The Composite of Snobol
description: Grouping arcane components into nested string structures.
type: snobol
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Weaving"
formula: |2
          * Composite Pattern in SNOBOL4
          LEAF1 = 'Rune of Fire'
          LEAF2 = 'Rune of Ice'
          NODE = '<' LEAF1 '|' LEAF2 '>'

          OUTPUT = 'Composite Spell: ' NODE
  END
tags: [snobol, structural, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

SNOBOL naturally supports the Composite pattern by letting the programmer build recursive string representations. Leaves and Nodes are unified under the universal string type, separated by magical delimiters.
