---
title: Builder in ReasonML
description: Step-by-step construction of complex arcane records.
type: reason
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  type potion = { mana: int, health: int, name: string };
  let defaultPotion = { mana: 0, health: 0, name: "Empty Vial" };
  let withMana = (m, p) => { ...p, mana: m };
  let withHealth = (h, p) => { ...p, health: h };
  let brew = (p) => p;

  let myPotion = defaultPotion |> withMana(50) |> withHealth(100) |> brew;
tags: [reason, builder, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using pipeline operators, the Builder pattern in ReasonML transposes into a sequence of partial mutations, weaving attributes into a final immutable potion.
