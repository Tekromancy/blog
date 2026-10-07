---
title: The Composite of the Progenitor
description: Build fractal arcane structures using algebraic datatypes.
type: sml
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Fractal Weaving"
formula: |2
  datatype spell_component = 
      SingleRune of string
    | RuneCluster of spell_component list
  
  fun evaluate (SingleRune r) = 
      print ("Activating rune: " ^ r ^ "\n")
    | evaluate (RuneCluster clusters) = 
      (print "Opening cluster...\n";
       app evaluate clusters;
       print "Closing cluster.\n")
  
  val megaSpell = RuneCluster [
    SingleRune "Ignis",
    RuneCluster [
      SingleRune "Aer",
      SingleRune "Motus"
    ],
    SingleRune "Finis"
  ]
  
  val _ = evaluate megaSpell
tags: [datatypes, trees, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

For the ML Progenitor, the Composite pattern is not a design pattern; it is a fundamental way of life. Algebraic datatypes allow you to recursively define `spell_component` as either a single leaf or a branch containing a list of its own type. A simple recursive function uses pattern matching to seamlessly execute both primitive runes and sprawling rune clusters.
