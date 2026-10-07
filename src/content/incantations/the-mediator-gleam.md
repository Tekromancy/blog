---
title: The Mediator
description: Coordinating actors through a central hub.
type: gleam
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Ley Line Nexus"
formula: |2
  import gleam/erlang/process.{type Subject}
  import gleam/otp/actor

  pub type NexusMsg {
    Broadcast(String)
  }

  fn handle_nexus(msg: NexusMsg, nodes: List(Subject(String))) -> actor.Next(NexusMsg, List(Subject(String))) {
    case msg {
      Broadcast(spell) -> {
        gleam/list.each(nodes, fn(node) { process.send(node, spell) })
        actor.continue(nodes)
      }
    }
  }
tags: [divination, mediator, gleam, otp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator
A dedicated actor serves as a nexus, broadcasting messages to subscribed nodes without them needing direct references to one another.
