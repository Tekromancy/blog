---
title: "The Singleton"
description: "A unique, solitary state tracker for the STARK prover."
type: cairo
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Isolation"
formula: |2
  // Cairo's smart contract state acts as a natural singleton
  #[starknet::interface]
  trait IProverState<TContractState> {
      fn get_state(self: @TContractState) -> felt252;
      fn update_state(ref self: TContractState, new_state: felt252);
  }
  #[starknet::contract]
  mod ProverStateSingleton {
      #[storage]
      struct Storage {
          global_state: felt252,
      }
      #[abi(embed_v0)]
      impl ProverStateImpl of super::IProverState<ContractState> {
          fn get_state(self: @ContractState) -> felt252 {
              self.global_state.read()
          }
          fn update_state(ref self: ContractState, new_state: felt252) {
              self.global_state.write(new_state);
          }
      }
  }
tags: [cairo, design-pattern, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The global storage acts as an immovable anchor, ensuring only one Prover State exists across the ethereal Starknet plane.
