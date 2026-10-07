---
title: Visitor in Dhall
description: Decouple operational logic from structural data by traversing runic variants.
type: dhall
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Exploration"
formula: |2
  let Shape = < Circle : Natural | Rectangle : { w : Natural, h : Natural } >
  
  let Visitor =
        { visitCircle : Natural -> Text
        , visitRectangle : { w : Natural, h : Natural } -> Text
        }
  
  let accept = \(s : Shape) -> \(v : Visitor) ->
        merge
          { Circle = v.visitCircle
          , Rectangle = v.visitRectangle
          }
          s
  
  let descriptionVisitor : Visitor =
        { visitCircle = \(r : Natural) -> "Circle of radius rune"
        , visitRectangle = \(dims : { w : Natural, h : Natural }) -> "Rectangular matrix"
        }
  
  in  accept (Shape.Circle 5) descriptionVisitor
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In a dynamically bound, functional paradigm, the **Visitor** pattern is realized natively through exhaustive pattern matching over sum types. By enforcing a `merge` expression that handles every possible variant of the configuration data, Dhall guarantees that no shape escapes the analytical gaze of the archmage, culminating in safe and halted execution.
