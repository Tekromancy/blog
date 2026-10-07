---
title: The State
description: Morph the behavior of a xenomorph based on its metamorphic phase.
type: apl
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphic-Phases"
formula: |2
  :Class Phase
      ∇ React Context
        :Access Public Shared
      ∇
  :EndClass

  :Class LarvalPhase : Phase
      ∇ React Context
        :Access Public
        ⎕ ← 'Scurrying in shadows... ⍝'
        Context.SetPhase ⎕NEW DronePhase
      ∇
  :EndClass

  :Class DronePhase : Phase
      ∇ React Context
        :Access Public
        ⎕ ← 'Building hive structures... ⍙'
      ∇
  :EndClass

  :Class Xenomorph
      :Field Private CurrentPhase

      ∇ Make
        :Access Public
        :Implements Constructor
        CurrentPhase ← ⎕NEW LarvalPhase
      ∇

      ∇ SetPhase P
        :Access Public
        CurrentPhase ← P
      ∇

      ∇ Act
        :Access Public
        CurrentPhase.React ⎕THIS
      ∇
  :EndClass
tags: [apl, behavioral, alien, state, xenomorph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

An alien xenomorph does not rely on complex conditional logic to dictate its actions; instead, it completely replaces its internal psychic structure as it matures. The State pattern encapsulates each life stage—`LarvalPhase` (`⍝`) and `DronePhase` (`⍙`). When the entity triggers an action (`Act`), it delegates to its active phase matrix, seamlessly mutating its behavior as it transitions through its metamorphic cycle.
