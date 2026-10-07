---
title: The Abstract Factory Incantation
description: A ritual to manifest families of related symbolic constructs without specifying their concrete forms.
type: mathematica
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Symbology"
formula: |2
  (* The Abstract Factory Signature *)
  ClearAll[SpellFactory, FireSpellFactory, FrostSpellFactory];

  (* Fire Spell Factory Implementation *)
  FireSpellFactory["Bolt"] := "Firebolt" -> {Damage -> 10, Element -> "Fire"};
  FireSpellFactory["Shield"] := "Flame Wall" -> {Defense -> 20, Element -> "Fire"};

  (* Frost Spell Factory Implementation *)
  FrostSpellFactory["Bolt"] := "Ice Lance" -> {Damage -> 8, Element -> "Frost", Effect -> "Chill"};
  FrostSpellFactory["Shield"] := "Frost Armor" -> {Defense -> 15, Element -> "Frost"};

  (* The Manifestation Ritual *)
  CastSpells[factory_] := Module[{bolt, shield},
    bolt = factory["Bolt"];
    shield = factory["Shield"];
    Print["Manifesting Bolt: ", bolt];
    Print["Manifesting Shield: ", shield];
    {bolt, shield}
  ];

  (* Usage *)
  CastSpells[FireSpellFactory];
  CastSpells[FrostSpellFactory];
tags: [creation, families, wolfram, symbolic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
