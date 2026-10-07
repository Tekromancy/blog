---
title: Composite
description: Compose arcane sigils into tree structures representing complex enchantments, treating individual and grouped sigils uniformly.
type: d
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Sigil Synthesis"
formula: |2
  interface ISigil { void activate(); }

  class BasicSigil : ISigil {
      override void activate() {}
  }

  class SigilArray : ISigil {
      private ISigil[] sigils;
      void add(ISigil s) { sigils ~= s; }
      override void activate() {
          foreach(s; sigils) s.activate();
      }
  }
tags: [structural, composite, dlang, tree]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Construct arrays of runes that trigger synchronously.
