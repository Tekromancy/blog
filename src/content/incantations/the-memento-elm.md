---
title: Memento in Elm
description: Implementing time-travel and undo mechanics in Elm through Model snapshots.
type: elm
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Temporal Reversion"
formula: |2
  module Memento exposing (Model, Msg(..), init, update)
  
  -- The Memento is simply a saved copy of the Model (or a part of it)
  
  type alias Model =
      { currentInput : String
      , history : List String
      }
  
  init : Model
  init =
      { currentInput = "", history = [] }
  
  type Msg
      = TypeInput String
      | SaveState
      | Undo
  
  update : Msg -> Model -> Model
  update msg model =
      case msg of
          TypeInput text ->
              { model | currentInput = text }
              
          SaveState ->
              { model | history = model.currentInput :: model.history }
              
          Undo ->
              case model.history of
                  [] ->
                      model
                      
                  lastSaved :: rest ->
                      { model | currentInput = lastSaved, history = rest }
tags: [elm, behavioral, memento, undo-redo, time-travel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento: The Chronomancer's Save State

In the mutable wastes of OOP, saving state requires careful encapsulation and deeply guarded Memento objects. In the functional sanctity of Elm, the entire `Model` is inherently a pure snapshot of the application at a single point in time. Implementing the Memento pattern—Time Travel—is as simple as pushing these snapshots onto a `List`. The chronomancer can merely pop a previous state off the stack and replace the current present, rewriting history without side-effects.
