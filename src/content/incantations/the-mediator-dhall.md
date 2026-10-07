---
title: Mediator in Dhall
description: Centralize communication between disparate magical components to prevent tangled dependencies.
type: dhall
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Centralization"
formula: |2
  let ComponentA = { send : Text -> Text }
  let ComponentB = { receive : Text -> Text }
  
  let Mediator = { notify : Text -> Text }
  
  let mediator : Mediator =
        { notify = \(msg : Text) -> "Mediator processed: " ++ msg }
  
  let a : ComponentA = { send = \(msg : Text) -> mediator.notify msg }
  
  in  a.send "Halt the engines!"
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Mediator** in Dhall serves as a centralized record of functional routing. Rather than having myriad configuration files inject functions into each other (which can cause circular dependency traps), they all depend on the Mediator construct. This keeps the configuration graph clean, acyclic, and perfectly halting.
