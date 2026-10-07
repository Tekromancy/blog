---
title: Abstract Factory in Elm
description: Forging elemental UI components through the Abstract Factory in Elm.
type: elm
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // UI Alchemy"
formula: |2
  module AbstractFactory exposing (UIFactory, cyberpunkTheme, steampunkTheme)
  
  import Html exposing (Html, button, input, text)
  import Html.Attributes exposing (class, placeholder)
  import Html.Events exposing (onClick, onInput)
  
  type alias UIFactory msg =
      { button : String -> msg -> Html msg
      , inputField : String -> (String -> msg) -> Html msg
      }
  
  cyberpunkTheme : UIFactory msg
  cyberpunkTheme =
      { button = \label msg -> button [ class "neon-glow-btn", onClick msg ] [ text label ]
      , inputField = \hint msg -> input [ class "chroma-input", placeholder hint, onInput msg ] []
      }
  
  steampunkTheme : UIFactory msg
  steampunkTheme =
      { button = \label msg -> button [ class "brass-cog-btn", onClick msg ] [ text label ]
      , inputField = \hint msg -> input [ class "copper-pipe-input", placeholder hint, onInput msg ] []
      }
tags: [elm, creational, abstract-factory, tea, pure-ui]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory: Weaving the Aesthetic Matrices

In the pure functional ether of Elm, the Abstract Factory transcends its object-oriented lineage. It becomes a record of functions, a nexus of pure UI alchemy. The magus no longer binds logic to mutable instances, but instead creates a factory of pure view functions to transmute raw data into cohesive aesthetic interfaces, be it neon-drenched Cyberpunk grids or steam-venting Steampunk dials.
