---
title: The State of the Homunculus
description: Changing behavior of an alchemical construct based on its internal elemental phase.
type: roc
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Alchemy"
tags: [fast-functional-wards, roc, state, fsm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface HomunculusState
      exposes [Phase, Homunculus, act, transition]
      imports []

  Phase : [Solid, Liquid, Gas]

  Homunculus : { phase : Phase, power : U64 }

  act : Homunculus -> Str
  act = \homunculus ->
      when homunculus.phase is
          Solid -> "The homunculus strikes with crushing force!"
          Liquid -> "The homunculus flows around the attack!"
          Gas -> "The homunculus suffocates the target!"

  transition : Homunculus, Phase -> Homunculus
  transition = \homunculus, newPhase ->
      { homunculus & phase: newPhase }
---
