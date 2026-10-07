---
title: The State
description: Transitioning actor behavior via state machines.
type: gleam
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  import gleam/otp/actor

  pub type State {
    Solid
    Liquid
    Gas
  }

  pub type Msg {
    Heat
    Cool
  }

  fn handle(msg: Msg, state: State) -> actor.Next(Msg, State) {
    case state, msg {
      Solid, Heat -> actor.continue(Liquid)
      Liquid, Heat -> actor.continue(Gas)
      Gas, Cool -> actor.continue(Liquid)
      Liquid, Cool -> actor.continue(Solid)
      _, _ -> actor.continue(state)
    }
  }
tags: [transmutation, state, gleam, otp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State
An OTP actor implicitly implements the State pattern. Its loop naturally transitions through various states based on incoming messages.
