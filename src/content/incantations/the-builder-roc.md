---
title: The Builder of Runes
description: Step-by-step construction of complex defensive barriers using the pipelining of Roc.
type: roc
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Runecraft"
tags: [fast-functional-wards, roc, builder, pipeline]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface RuneBuilder
      exposes [Rune, initRune, addPower, addElement, seal]
      imports []

  RuneBuilderState : {
      power : U64,
      element : [None, Fire, Water, Aether],
      sealed : Bool
  }

  Rune : { power : U64, element : [None, Fire, Water, Aether] }

  initRune : RuneBuilderState
  initRune = { power: 0, element: None, sealed: Bool.false }

  addPower : RuneBuilderState, U64 -> RuneBuilderState
  addPower = \state, amount ->
      { state & power: state.power + amount }

  addElement : RuneBuilderState, [None, Fire, Water, Aether] -> RuneBuilderState
  addElement = \state, elem ->
      { state & element: elem }

  seal : RuneBuilderState -> Result Rune [AlreadySealed]
  seal = \state ->
      if state.sealed then
          Err AlreadySealed
      else
          Ok { power: state.power, element: state.element }
---
