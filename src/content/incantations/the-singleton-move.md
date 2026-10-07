---
title: The Singleton Core Crystal
description: Implement the Singleton pattern in Move by storing a single resource at a module address.
type: move
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Warding"
formula: |2
  module arcane::singleton {
      use std::signer;
  
      struct CoreCrystal has key {
          energy: u64,
      }
  
      const EALREADY_INITIALIZED: u64 = 1;
      const ENOT_AUTHORIZED: u64 = 2;
  
      public fun initialize(account: &signer) {
          let addr = signer::address_of(account);
          assert!(addr == @arcane, ENOT_AUTHORIZED);
          assert!(!exists<CoreCrystal>(addr), EALREADY_INITIALIZED);
          
          move_to(account, CoreCrystal { energy: 1000 });
      }
  
      public fun consume_energy(addr: address, amount: u64) acquires CoreCrystal {
          let crystal = borrow_global_mut<CoreCrystal>(addr);
          crystal.energy = crystal.energy - amount;
      }
  }
tags: [creational, singleton, move, crystal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
