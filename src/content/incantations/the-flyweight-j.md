---
title: "The Flyweight"
description: "Sharing common runic substructures in a massive array grid to save arcane essence."
type: j
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Essence Compression"
formula: |2
  NB. J's symbol type ('s') acts as a flyweight, interning strings
  
  runes =: s: 'fire' ; 'ice' ; 'fire' ; 'lightning' ; 'ice'
  
  NB. Memory used is minimal as 'fire' and 'ice' are stored once
  NB. Operations like comparison are highly optimized
  is_fire =: runes = s: <'fire'
tags: [flyweight, symbols, interning, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The `s:` (symbol) datatype inherently implements the Flyweight pattern in J, interning boxed strings for fast comparison and low memory footprint.
