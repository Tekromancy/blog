---
title: "The State: Dimensional Shifting"
description: "Alter a ward's behavior by physically moving its instruction pointer to a new plane."
type: trefunge
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymancy"
formula: |2
  > "State 1" ? v
  v "State 2" h <
  > "State 3" h v
  @ l l < < < < <
tags: [state, trefunge, topology, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In Trefunge, the State pattern is achieved quite literally through Dimensional Shifting. The behavior of a Three-Dimensional Topology Ward depends entirely on which Z-plane the instruction pointer currently occupies.

By triggering a state transition, the pointer is shifted up (`h`) or down (`l`) into a completely new set of planar instructions, dynamically altering the ward's reaction to identical inputs without complex conditional logic.
