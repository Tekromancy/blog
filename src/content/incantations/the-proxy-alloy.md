---
title: "The Proxy: The Gatekeeper Node"
description: "Provide a surrogate or placeholder for another object to control access to it."
type: alloy
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access-Control"
formula: |2
  abstract sig Vault {
    retrieve: lone DataCore
  }
  
  sig DeepVault extends Vault {}
  
  sig VaultProxy extends Vault {
    realVault: lone DeepVault,
    clearance: lone ClearanceLevel
  }
  {
    clearance = HighClearance implies retrieve = realVault.retrieve else no retrieve
  }
  
  enum ClearanceLevel { HighClearance, LowClearance }
  sig DataCore {}
  
  pred access_granted[p: VaultProxy] {
    some p.retrieve
  }
  
  run access_granted for 3
tags: [structural, proxy, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy: The Gatekeeper Node

The Proxy intercepts access to the `DeepVault`. In relational logic, we simply enforce a conditional block on the output relation. The Proxy's `retrieve` relation only mirrors the `realVault`'s data if the `clearance` state is `HighClearance`. Otherwise, the constraint `no retrieve` asserts that the proxy returns absolute void.
