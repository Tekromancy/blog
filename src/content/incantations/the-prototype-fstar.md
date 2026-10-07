---
title: The Prototype of Echo Spells
description: Cloning verified spells without needing to re-prove their correctness.
type: fstar
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  module Prototype
  
  noeq type spell = {
    incantation: string;
    mana_cost: nat;
    clone: unit -> spell;
  }
  
  let rec base_spell () : spell = {
    incantation = "Echo... echo...";
    mana_cost = 10;
    clone = (fun () -> base_spell ());
  }
tags: [prototype, cloning, echoes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype pattern captures the essence of spell echoing, ensuring that cloned spells maintain the exact mana cost and properties of the original.
