---
title: Decorator in Elm
description: Augmenting view functions through higher-order wrapping in Elm.
type: elm
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  module Decorator exposing (baseView, withBorder, withGlow, mainView)
  
  import Html exposing (Html, div, text)
  import Html.Attributes exposing (style)
  
  type alias ViewDecorator msg = 
      Html msg -> Html msg
  
  baseView : String -> Html msg
  baseView content =
      div [ style "padding" "20px" ] [ text content ]
  
  withBorder : String -> ViewDecorator msg
  withBorder color html =
      div [ style "border" ("2px solid " ++ color) ] [ html ]
  
  withGlow : String -> ViewDecorator msg
  withGlow glowColor html =
      div [ style "box-shadow" ("0 0 10px " ++ glowColor) ] [ html ]
  
  -- Composing the decorations
  mainView : Html msg
  mainView =
      baseView "Neural Core Online"
          |> withBorder "#00ffcc"
          |> withGlow "#ff00ff"
tags: [elm, structural, decorator, higher-order-functions, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator: The Layers of Power

In Elm, the Decorator pattern discards class hierarchies in favor of elegant function composition. By creating Higher-Order Functions that take an `Html msg` and return a new, wrapped `Html msg`, the alchemist can dynamically stack visual enhancements onto a core component. Using the pipeline operator, simple elements are easily infused with neon borders and chromatic glows without altering the original spell matrix.
