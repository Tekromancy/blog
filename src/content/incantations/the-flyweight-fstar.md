---
title: The Flyweight of Swarm Familiars
description: Sharing state among a massive swarm of familiars to minimize mana cost.
type: fstar
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarms"
formula: |2
  module Flyweight
  
  type familiar_type = { species: string; base_mana: nat }
  
  let bee_type = { species = "Arcane Bee"; base_mana = 1 }
  
  type familiar_instance = {
    shared: familiar_type;
    x: int;
    y: int;
  }
  
  let spawn_bee (x y: int) : familiar_instance =
    { shared = bee_type; x = x; y = y }
tags: [flyweight, optimization, swarms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Using shared records for intrinsic state allows the summoning of massive swarms of familiars without exhausting the caster's mana.
