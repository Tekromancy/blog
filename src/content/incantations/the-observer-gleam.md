---
title: The Observer
description: Subscribing to mystical emanations via message passing.
type: gleam
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying Runes"
formula: |2
  import gleam/erlang/process.{type Subject}

  pub type Event {
    SpellCast(name: String)
  }

  pub fn notify_observers(observers: List(Subject(Event)), event: Event) {
    gleam/list.each(observers, fn(obs) { process.send(obs, event) })
  }
tags: [divination, observer, gleam, otp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Observer
Observers are simply Erlang processes. We notify them by iterating over their Subjects and sending an event message.
