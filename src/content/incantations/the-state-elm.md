---
title: State in Elm
description: Defining UI states cleanly via Custom Types in Elm.
type: elm
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  module State exposing (ConnectionState(..), Model, Msg(..), update, view)
  
  import Html exposing (Html, div, text, button)
  import Html.Events exposing (onClick)
  
  -- The State is explicitly modeled as a Union Type
  type ConnectionState
      = Disconnected
      | Connecting
      | Connected String
  
  type alias Model =
      { connection : ConnectionState }
  
  type Msg
      = InitiateConnection
      | ConnectionSuccess String
      | TerminateConnection
  
  update : Msg -> Model -> Model
  update msg model =
      case (msg, model.connection) of
          (InitiateConnection, Disconnected) ->
              { model | connection = Connecting }
              
          (ConnectionSuccess ip, Connecting) ->
              { model | connection = Connected ip }
              
          (TerminateConnection, _) ->
              { model | connection = Disconnected }
              
          -- Ignore invalid state transitions
          _ -> 
              model
  
  view : Model -> Html Msg
  view model =
      case model.connection of
          Disconnected ->
              button [ onClick InitiateConnection ] [ text "Connect to Matrix" ]
              
          Connecting ->
              div [] [ text "Breaching ICE..." ]
              
          Connected ip ->
              div [] 
                  [ text ("Jacked into: " ++ ip)
                  , button [ onClick TerminateConnection ] [ text "Disconnect" ]
                  ]
tags: [elm, behavioral, state, finite-state-machine, custom-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State: The Finite State Matrix

In object-oriented code, State requires a web of classes implementing a common interface. In Elm, the Finite State Machine is natively realized via Custom Types (Algebraic Data Types). The UI and logic phase-shift seamlessly based on the current variant of `ConnectionState`. Invalid state transitions are elegantly ignored or handled via pattern matching in the `update` cycle, ensuring the program never slips into a paradoxical phase.
