---
title: Builder
description: Sequentially assemble complex homunculi or golems through a standardized somatic interface.
type: d
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct Assembly"
formula: |2
  class GolemBuilder {
      private string material;
      private string rune;

      GolemBuilder setMaterial(string m) { material = m; return this; }
      GolemBuilder inscribeRune(string r) { rune = r; return this; }

      struct Golem { string material; string rune; }
      Golem awaken() { return Golem(material, rune); }
  }
tags: [creational, builder, dlang, transmuation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Construct complex entities step-by-step.
