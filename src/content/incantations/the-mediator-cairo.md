---
title: "The Mediator"
description: "Centralized coordination between PROVE and VERIFY enchantments."
type: cairo
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  trait IMediator<T> { fn notify(self: @T, event: felt252); }
  
  #[derive(Copy, Drop)]
  struct ProverMediator {}
  impl MediatorImpl of IMediator<ProverMediator> {
      fn notify(self: @ProverMediator, event: felt252) {
          if event == 'proof_done' {
              // trigger verification
          }
      }
  }
tags: [cairo, design-pattern, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A master of ceremonies orchestrating the complex dance between constraint generation and verification without letting them tightly entwine.
