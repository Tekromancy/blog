---
title: Singleton in Elm
description: Utilizing the singular truth of the Elm Architecture's Model.
type: elm
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // State Isolation"
formula: |2
  module Singleton exposing (Model, Msg(..), init, update, view)
  
  import Html exposing (Html, div, text, button)
  import Html.Events exposing (onClick)
  
  -- The Singleton is inherently the application's root Model.
  type alias Model =
      { globalManaPool : Int }
  
  init : Model
  init =
      { globalManaPool = 100 }
  
  type Msg
      = CastSpell
      | ChannelLeyline
  
  update : Msg -> Model -> Model
  update msg model =
      case msg of
          CastSpell ->
              { model | globalManaPool = max 0 (model.globalManaPool - 10) }
              
          ChannelLeyline ->
              { model | globalManaPool = min 100 (model.globalManaPool + 5) }
  
  view : Model -> Html Msg
  view model =
      div []
          [ text ("Global Mana: " ++ String.fromInt model.globalManaPool)
          , button [ onClick CastSpell ] [ text "Cast" ]
          , button [ onClick ChannelLeyline ] [ text "Channel" ]
          ]
tags: [elm, creational, singleton, tea, global-state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Singleton: The One True Monad of State

In the chaotic realms of imperative programming, the Singleton is often a source of corruption and hidden side-effects. In Elm, the Singleton is elevated to a sacred principle: The Elm Architecture (TEA). There is only one state matrix—the `Model`. It flows continuously through the `update` cycle, ensuring that the singular source of truth is eternally preserved, predictable, and immune to temporal paradoxes.
