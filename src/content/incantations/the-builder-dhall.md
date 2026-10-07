---
title: Builder in Dhall
description: Assemble complex data records step by step using curried functions and record merges.
type: dhall
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Golemancy"
formula: |2
  let Golem = { material : Text, gem : Optional Text, runes : List Text }
  
  let defaultGolem : Golem =
        { material = "Clay", gem = None Text, runes = [] : List Text }
  
  let withGem =
        \(gem : Text) ->
        \(g : Golem) ->
          g // { gem = Some gem }
  
  let addRune =
        \(rune : Text) ->
        \(g : Golem) ->
          g // { runes = g.runes # [ rune ] }
  
  in  addRune "Guaranteed Halt" (withGem "Ruby" defaultGolem)
tags: [dhall, halting, runes, configuration, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Builder** pattern thrives in Dhall via curried functions and the record merge (`//`) operator. When constructing complex, halting-guaranteed configurations, the builder ensures that default values can be progressively overridden or augmented in a fluent and type-safe manner, culminating in a fully-realized magical construct.
