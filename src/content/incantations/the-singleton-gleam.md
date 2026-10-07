---
title: The Singleton
description: Global state management through BEAM actors.
type: gleam
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Node Singularity"
formula: |2
  import gleam/erlang/process.{type Subject}
  import gleam/otp/actor

  pub type Message {
    GetMana(reply_to: Subject(Int))
    UseMana(amount: Int)
  }

  fn handle_message(message: Message, mana: Int) -> actor.Next(Message, Int) {
    case message {
      GetMana(client) -> {
        process.send(client, mana)
        actor.continue(mana)
      }
      UseMana(amount) -> {
        actor.continue(mana - amount)
      }
    }
  }

  pub fn start_ley_line() -> Result(Subject(Message), actor.StartError) {
    actor.start(1000, handle_message)
  }
tags: [conjuration, singleton, gleam, otp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Singleton
True Singletons on the BEAM are named processes or actors. We eschew global mutable state in favor of a message-passing ley line entity.
