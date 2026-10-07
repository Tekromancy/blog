---
title: The Prototype
description: Clone existing spells to create new ones via content-addressed deep copies.
type: unison
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Cloning"
formula: |2
  structural type Spell = Spell Text Nat
  
  cloneSpell : Spell -> Spell
  cloneSpell s = match s with
    Spell name power -> Spell name power
    
  mutatePower : Nat -> Spell -> Spell
  mutatePower p s = match s with
    Spell name _ -> Spell name p
tags: [creational, prototype, unison, content-addressed]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In languages that suffer from the ravages of mutable memory, cloning an object is fraught with peril. In Unison, all structures are inherently immutable and content-addressed. The Prototype pattern is fundamentally native to the language: a simple function that matches the previous form and yields a new one, structurally identical yet distinct in its true hash.
