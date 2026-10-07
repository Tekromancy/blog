---
title: The State
description: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
type: unison
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Form Shifting"
formula: |2
  structural type Phase = Liquid | Solid | Gas
  
  structural type Elemental = Elemental Phase Nat
  
  applyHeat : Elemental -> Elemental
  applyHeat el = match el with
    Elemental Solid p -> Elemental Liquid p
    Elemental Liquid p -> Elemental Gas p
    Elemental Gas p -> Elemental Gas p
    
  attack : Elemental -> Text
  attack el = match el with
    Elemental Solid _ -> "Crush!"
    Elemental Liquid _ -> "Drown!"
    Elemental Gas _ -> "Suffocate!"
tags: [behavioral, state, unison, algebraic-data-types, fsm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The State pattern in object-oriented tongues relies on polymorphic swapping of internal reference classes. Unison approaches this through Algebraic Data Types representing a Finite State Machine. The `Phase` dictates the elemental's behavior. Functions simply pattern-match on the current phase, executing the correct logic and transitioning the entity to a newly hashed state in the weave.
