---
title: The Visitor Astral Projection
description: Represents an astral projection operation to be performed on the elements of an arcane object structure.
type: koka
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral"
formula: |2
  type arcane-entity
    Spell(name: string)
    Artifact(power: int)
  
  effect visitor
    fun visit-spell(name: string) : ()
    fun visit-artifact(power: int) : ()
  
  fun accept(e: arcane-entity) : <visitor|e> ()
    match e
      Spell(n) -> visit-spell(n)
      Artifact(p) -> visit-artifact(p)
  
  fun print-visitor(action: () -> <visitor|e> a) : e a
    with handler
      fun visit-spell(n) println("Examining spell: " ++ n)
      fun visit-artifact(p) println("Analyzing artifact power: " ++ p.show)
    action()
  
  pub fun main()
    val entities = [Spell("Invisibility"), Artifact(9000)]
    with print-visitor
    entities.foreach(accept)
tags: [koka, visitor, pattern-matching, effects]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
