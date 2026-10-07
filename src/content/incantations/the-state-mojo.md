---
title: The State of the Coiled Viper
description: Allowing an AI Serpent to alter its behavior when its internal state changes.
type: mojo
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  struct RestingState:
      fn handle(self) -> String:
          return "Conserving energy. Processing at 10%."

  struct StrikingState:
      fn handle(self) -> String:
          return "Overclocked! Processing at 300%!"

  struct ViperContext:
      var is_agitated: Bool
      
      fn __init__(inout self):
          self.is_agitated = False
          
      fn provoke(inout self):
          self.is_agitated = True
          
      fn request_action(self) -> String:
          if self.is_agitated:
              let state = StrikingState()
              return state.handle()
          else:
              let state = RestingState()
              return state.handle()

  fn main():
      var viper = ViperContext()
      print(viper.request_action())
      viper.provoke()
      print(viper.request_action())
tags: [behavioral, state, mojo, transitions, fsm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State of the Coiled Viper

An AI Serpent does not behave the same way in stealth mode as it does during an overt attack. The **State** pattern allows an object to completely alter its functionality when its internal variables shift, almost as if it changed its class entirely.

Rather than massive conditional trees that slow down execution, we transition between cleanly defined structs representing state (`RestingState`, `StrikingState`). Mojo compiles these transitions into brutal, efficient machine code without the bloat of traditional OOP state machines.
