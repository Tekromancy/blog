---
title: Prototype in Dhall
description: Clone and modify existing configuration archetypes.
type: dhall
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Echomancy"
formula: |2
  let Ward = { power : Natural, element : Text, active : Bool }
  
  let defaultWard : Ward = { power = 10, element = "Fire", active = True }
  
  let cloneAndModify =
        \(w : Ward) ->
        \(newPower : Natural) ->
          w // { power = newPower }
  
  in  cloneAndModify defaultWard 50
tags: [dhall, halting, runes, configuration, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Due to Dhall's immutable nature, the **Prototype** pattern is natively represented by its core semantics. Existing records act as prototypes, and the `//` (record merge) or `//\\` (record combine) operators allow an Adept to clone configurations while selectively overwriting the magical properties, yielding a new spell guaranteed to resolve completely.
