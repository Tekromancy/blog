---
title: Factory Method in ReasonML
description: Deferring instantiation to variant matchers.
type: reason
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  type spell = Fireball | Frostbolt;
  let cast = (s: spell) =>
    switch (s) {
    | Fireball => "Summoning flames..."
    | Frostbolt => "Chilling the air..."
    };
tags: [reason, factory-method, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Instead of classical inheritance, the Factory Method relies on the sacred variant types and pattern matching to conjure the correct implementation.
