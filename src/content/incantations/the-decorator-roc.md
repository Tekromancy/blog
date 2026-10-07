---
title: The Decorator of Wards
description: Enhancing functional shields dynamically through function composition.
type: roc
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Metamagic"
tags: [fast-functional-wards, roc, decorator, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface WardDecorator
      exposes [baseWard, withFireResistance, withReflection, buildWard]
      imports []

  WardFunction : (U64 -> U64)

  baseWard : WardFunction
  baseWard = \incomingDamage ->
      if incomingDamage > 10 then incomingDamage - 10 else 0

  withFireResistance : WardFunction -> WardFunction
  withFireResistance = \innerWard ->
      \damage ->
          reduced = damage / 2
          innerWard reduced

  withReflection : WardFunction -> WardFunction
  withReflection = \innerWard ->
      \damage ->
          # Reflect logic happens here, then inner ward
          innerWard damage

  buildWard : WardFunction
  buildWard =
      baseWard
      |> withFireResistance
      |> withReflection
---
