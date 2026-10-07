---
title: Template Method in Elm
description: Defining a skeleton algorithm while letting pure functions fill the gaps.
type: elm
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Algorithmic Skeleton"
formula: |2
  module TemplateMethod exposing (RenderHooks, renderPage, neonHooks)
  
  import Html exposing (Html, div, header, footer, text, main_)
  
  -- The "Hooks" needed by the template
  type alias RenderHooks msg =
      { renderHeader : Html msg
      , renderBody : Html msg
      , renderFooter : Html msg
      }
  
  -- The Template Method
  renderPage : RenderHooks msg -> Html msg
  renderPage hooks =
      div []
          [ header [] [ hooks.renderHeader ]
          , main_ [] [ hooks.renderBody ]
          , footer [] [ hooks.renderFooter ]
          ]
          
  -- A specific implementation
  neonHooks : RenderHooks msg
  neonHooks =
      { renderHeader = div [] [ text "Neon Title" ]
      , renderBody = div [] [ text "Glowing Content Grid" ]
      , renderFooter = div [] [ text "System Status: Nominal" ]
      }
tags: [elm, behavioral, template-method, composition, higher-order-components]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Template Method: The Skeletal Runes

Without inheritance, Elm achieves the Template Method via inversion of control and record structures. A core view function (`renderPage`) dictates the unalterable skeletal structure of the DOM. However, it requires a record of "hook" functions to fill in the flesh. The alchemist provides these specific hooks, allowing the underlying algorithm to execute its strict visual layout while manifesting vastly different internal aesthetics.
