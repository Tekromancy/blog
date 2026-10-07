---
title: The Prototype Incantation
description: Cloning and modifying existing magical patterns using symbolic substitution.
type: mathematica
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  (* The base prototype *)
  baseSpell = Spell["Arcane Missile", {Damage -> 5, Element -> "Arcane", Cost -> 10}];

  (* The Cloning Ritual utilizing ReplaceAll (/.) for modifications *)
  CloneSpell[prototype_, modifications___Rule] := 
    prototype /. {modifications, Rule[k_, v_] :> Rule[k, v]};

  (* Usage: Cloning with specific tweaks *)
  empoweredSpell = CloneSpell[baseSpell, Damage -> 15, Cost -> 20];
  fireSpell = CloneSpell[baseSpell, Element -> "Fire", Name -> "Fire Missile"];

  Print["Base: ", baseSpell];
  Print["Empowered: ", empoweredSpell];
  Print["Fire Variant: ", fireSpell];
tags: [cloning, rules, replacement, substitution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
