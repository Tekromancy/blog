---
title: The Composite of the Fractal Runes
description: Compose tag-wards into tree structures to represent part-whole hierarchies.
type: coldfusion
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractals"
formula: |2
  interface name="IRune" {
      public void activate();
  }

  component name="SimpleRune" implements="IRune" {
      public void function activate() {
          writeOutput("Single rune glowing. ");
      }
  }

  component name="RuneCluster" implements="IRune" {
      variables.runes = [];

      public void function addRune(IRune rune) {
          arrayAppend(variables.runes, arguments.rune);
      }

      public void function activate() {
          for (var r in variables.runes) {
              r.activate();
          }
      }
  }
tags: [composite, coldfusion, fractal-magic, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When weaving massive binding circles, treating a single rune the same as an entire cluster of runes greatly simplifies the chant. The Composite pattern lets the alchemist invoke `activate()` on the highest-level ward, cascading the magical energy down through all nested sigils.
