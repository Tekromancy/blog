---
title: The Proxy Vault Guard
description: Provide a surrogate or placeholder for another object to control access to it in Move.
type: move
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  module arcane::proxy {
      use std::signer;
  
      struct Vault has key {
          secret: u64,
      }
  
      const EUNAUTHORIZED: u64 = 1;
  
      // Proxy checks permissions before accessing the actual Vault resource
      public fun get_secret(caller: &signer, vault_addr: address): u64 acquires Vault {
          assert!(signer::address_of(caller) == @arcane, EUNAUTHORIZED);
          
          let vault = borrow_global<Vault>(vault_addr);
          vault.secret
      }
  }
tags: [structural, proxy, move, security, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
