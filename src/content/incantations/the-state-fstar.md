---
title: The State of the Elemental Core
description: Changing an elemental core's behavior based on its internal attunement.
type: fstar
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Evocation // Elements"
formula: |2
  module State
  
  type element_state = | Solid | Liquid | Gas
  
  let apply_heat (s: element_state) : element_state =
    match s with
    | Solid -> Liquid
    | Liquid -> Gas
    | Gas -> Gas
    
  let apply_cold (s: element_state) : element_state =
    match s with
    | Gas -> Liquid
    | Liquid -> Solid
    | Solid -> Solid
tags: [state, elements, transitions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Using Algebraic Data Types to model the State pattern, naturally capturing transitions between the elemental states of a magical core.
