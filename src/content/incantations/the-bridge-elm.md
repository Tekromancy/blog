---
title: Bridge in Elm
description: Decoupling UI structure from thematic implementation using the Bridge pattern in Elm.
type: elm
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Illusion // Decoupling"
formula: |2
  module Bridge exposing (Theme, lightTheme, darkTheme, viewCard)
  
  import Html exposing (Html, div, text)
  import Html.Attributes exposing (style)
  
  -- The Implementor
  type alias Theme =
      { bg : String, fg : String }
  
  lightTheme : Theme
  lightTheme = { bg = "#ffffff", fg = "#000000" }
  
  darkTheme : Theme
  darkTheme = { bg = "#1a1a1a", fg = "#00ffcc" }
  
  -- The Abstraction (Using the implementor)
  type alias Card =
      { title : String, content : String }
  
  viewCard : Theme -> Card -> Html msg
  viewCard theme card =
      div 
          [ style "background-color" theme.bg
          , style "color" theme.fg
          , style "border" ("1px solid " ++ theme.fg)
          , style "padding" "10px"
          ]
          [ div [ style "font-weight" "bold" ] [ text card.title ]
          , div [] [ text card.content ]
          ]
tags: [elm, structural, bridge, ui-themes, separation-of-concerns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge: Splitting the Monolithic Spire

In the art of Pure UI Alchemy, tightly coupling a component's structure with its aesthetic rules leads to brittle code. The Bridge pattern in Elm separates the Abstraction (the view structure) from the Implementor (the Theme or style data). By passing the `Theme` as a parameter to the view function, the visual matrix can seamlessly hot-swap from blinding Light to cyberpunk Dark without altering the underlying HTML topography.
