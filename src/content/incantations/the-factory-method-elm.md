---
title: Factory Method in Elm
description: Summoning specific UI constructs dynamically in Elm using Union Types.
type: elm
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Dynamic Spawning"
formula: |2
  module FactoryMethod exposing (WidgetType(..), viewWidget)
  
  import Html exposing (Html, div, text, span)
  import Html.Attributes exposing (class)
  
  type WidgetType
      = Hologram String
      | DataCrystal String
      | NeuralJack Int
  
  viewWidget : WidgetType -> Html msg
  viewWidget widget =
      case widget of
          Hologram msg ->
              div [ class "holo-emitter" ] [ text ("Projecting: " ++ msg) ]
              
          DataCrystal data ->
              span [ class "crystal-shard" ] [ text ("Decrypted: " ++ data) ]
              
          NeuralJack ports ->
              div [ class "jack-interface" ] [ text ("Available Ports: " ++ String.fromInt ports) ]
tags: [elm, creational, factory-method, union-types, ui-alchemy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Factory Method: The Prism of Manifestation

The Factory Method in Elm sheds its inheritance-heavy chains. Through the power of Custom Types (Algebraic Data Types) and pattern matching, the logic of instantiation is crystallized into a single, omniscient view function. The magus merely declares the intent via a tag, and the Elm architecture flawlessly projects the correct UI manifestation onto the visual grid.
