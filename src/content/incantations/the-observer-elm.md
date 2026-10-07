---
title: Observer in Elm
description: Reacting to external signals via Subscriptions in the Elm Architecture.
type: elm
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Global Scrying"
formula: |2
  module Observer exposing (main)
  
  import Browser
  import Html exposing (Html, text, div)
  import Time exposing (Posix)
  
  -- The Subject is external (e.g., Time or WebSockets)
  -- The Observers are the Subscriptions mapping signals to Msgs
  
  type alias Model =
      { currentTime : Int }
  
  type Msg
      = Tick Posix
  
  init : () -> ( Model, Cmd Msg )
  init _ =
      ( { currentTime = 0 }, Cmd.none )
  
  update : Msg -> Model -> ( Model, Cmd Msg )
  update msg model =
      case msg of
          Tick posix ->
              ( { model | currentTime = Time.posixToMillis posix }, Cmd.none )
  
  -- Subscriptions act as the Observer binding
  subscriptions : Model -> Sub Msg
  subscriptions _ =
      Time.every 1000 Tick
  
  view : Model -> Html Msg
  view model =
      div [] [ text ("System Time: " ++ String.fromInt model.currentTime) ]
      
  main =
      Browser.element
          { init = init
          , update = update
          , subscriptions = subscriptions
          , view = view
          }
tags: [elm, behavioral, observer, subscriptions, signals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Observer: The Scrying Pool of Signals

Instead of maintaining a mutable list of listener objects to ping when state changes, Elm achieves the Observer pattern flawlessly through its `subscriptions` function. The program defines which external arcane forces (like the passage of Time, or websocket transmissions) it wishes to scry. The Elm runtime acts as the ultimate Subject, dispatching purely typed messages to the `update` function whenever the cosmos shifts.
