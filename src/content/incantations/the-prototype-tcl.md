---
title: The Prototype
description: Copies existing magical artifacts rather than creating new ones from scratch.
type: tcl
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  oo::class create MagicalClone {
      variable essence
      constructor {e} { set essence $e }
      method clone {} {
          return [MagicalClone new $essence]
      }
      method show {} { puts "Essence is: $essence" }
      method mutate {newEssence} { set essence $newEssence }
  }

  set original [MagicalClone new "Pure Void"]
  set copy [$original clone]

  $original show
  $copy show
  $copy mutate "Corrupted Void"
  $copy show
  $original show
tags: [creational, prototype, cloning, illusion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Prototype

Why weave a complex matrix from raw entropy when you can slice a copy from an existing stable construct? The Prototype pattern in Tcl bypasses initialization rituals, cloning object states into new instances. It is the hallmark of the digital doppelganger.
