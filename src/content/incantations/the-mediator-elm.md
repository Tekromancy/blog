---
title: Mediator in Elm
description: Centralizing UI component communication through the Elm Model.
type: elm
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  module Mediator exposing (Model, Msg(..), update, view)
  
  import Html exposing (Html, div, text, button)
  import Html.Events exposing (onClick)
  
  -- The Mediator is the unified Model
  type alias Model =
      { subsystemA_Active : Bool
      , subsystemB_Power : Int
      }
  
  type Msg
      = ToggleA
      | BoostB
  
  update : Msg -> Model -> Model
  update msg model =
      case msg of
          ToggleA ->
              let 
                  newA = not model.subsystemA_Active
                  -- Subsystem A affects Subsystem B through the Mediator
                  newB = if newA then model.subsystemB_Power + 10 else 0
              in
              { model | subsystemA_Active = newA, subsystemB_Power = newB }
              
          BoostB ->
              { model | subsystemB_Power = model.subsystemB_Power + 5 }
  
  view : Model -> Html Msg
  view model =
      div [] [ text "Mediated View" ]
tags: [elm, behavioral, mediator, tea, centralized-state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Mediator: The Central Cortex

In a tangled web of UI components, letting them communicate directly leads to chaos. The Mediator pattern imposes order by routing all signals through a central hub. In Elm, this is inherently enforced by the architecture itself. The global `Model` and the single `update` function act as the ultimate Mediator. Components emit pure `Msg` signals, and the `update` function resolves the intricate causal links between subsystems, keeping the view functions blissfully ignorant of each other.
