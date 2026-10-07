---
title: The Builder of the Progenitor
description: Incrementally compose complex magical potions using functional updates.
type: sml
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Incremental Brewing"
formula: |2
  type potion = {
    base: string,
    essence: string option,
    power: int
  }
  
  val defaultPotion : potion = {
    base = "Water",
    essence = NONE,
    power = 0
  }
  
  fun withBase b (p: potion) : potion =
    {base = b, essence = #essence p, power = #power p}
  
  fun withEssence e (p: potion) : potion =
    {base = #base p, essence = SOME e, power = #power p}
  
  fun withPower pw (p: potion) : potion =
    {base = #base p, essence = #essence p, power = pw}
  
  fun build (p: potion) = p
  
  (* Usage *)
  val masterBrew = 
    defaultPotion
    |> withBase "Dragon Blood"
    |> withEssence "Phoenix Tear"
    |> withPower 100
    |> build
tags: [records, pipeline, functional update]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the ancient functional rites of Standard ML, the Builder pattern is not an object accumulating mutations. Rather, it is a sequence of pure functional updates applied to a record. By chaining functions together (often using a pipeline operator if defined, or simple composition), an Archmage can incrementally weave together complex records without ever introducing side effects or incomplete states.
