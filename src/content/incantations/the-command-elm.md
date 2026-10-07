---
title: Command in Elm
description: Encapsulating intents as Custom Types within The Elm Architecture.
type: elm
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Intent Binding"
formula: |2
  module Command exposing (Msg(..), update)
  
  -- The Command Object is simply the Msg Custom Type!
  type Msg
      = UploadVirus String
      | BypassFirewall Int
      | AbortSequence
  
  type alias Model =
      { status : String, activeConnections : Int }
  
  -- The Invoker and Receiver are merged into the Update function
  update : Msg -> Model -> Model
  update msg model =
      case msg of
          UploadVirus payload ->
              { model | status = "Uploading " ++ payload ++ "..." }
              
          BypassFirewall port ->
              { model | status = "Bypassing port " ++ String.fromInt port, activeConnections = model.activeConnections + 1 }
              
          AbortSequence ->
              { model | status = "Sequence Aborted.", activeConnections = 0 }
tags: [elm, behavioral, command, tea, custom-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Command: The Sigils of Intent

In Object-Oriented paradigms, the Command pattern requires heavy boilerplate to wrap actions into objects. In Elm, the Command pattern is the very lifeblood of the architecture. Every variant in the `Msg` Custom Type is a perfect Command. It encapsulates the intent and required data. The `update` function acts as the universal invoker, unpacking the sigil and applying the pure state mutation across the UI matrix.
