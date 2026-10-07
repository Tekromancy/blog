---
title: The Mediator of the Arcane Council
description: Centralizing communication between rival wizard guilds.
type: fstar
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Diplomatic"
formula: |2
  module Mediator
  
  type guild = | Fire | Water
  
  let mediator_broadcast (sender: guild) (msg: string) : string =
    match sender with
    | Fire -> "Water Guild receives: " ^ msg
    | Water -> "Fire Guild receives: " ^ msg
tags: [mediator, guilds, communication]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator centralizes the chaotic messaging between opposing arcane guilds, avoiding tightly coupled and explosive direct communications.
