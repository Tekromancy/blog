---
title: "The Command"
description: "Encapsulating prover instructions as portable spells."
type: cairo
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  trait ICommand<T> { fn execute(self: @T); }
  
  #[derive(Copy, Drop)]
  struct GenerateProofCommand { data: felt252 }
  
  impl GenProofImpl of ICommand<GenerateProofCommand> {
      fn execute(self: @GenerateProofCommand) {
          // execute magic
      }
  }
tags: [cairo, design-pattern, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Binds the intent of proof generation into a tangible object, capable of being stored, delayed, or reversed.
