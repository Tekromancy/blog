---
title: "The Strategy: Interchangeable Defense Algorithms"
description: "Define a family of validation algorithms, encapsulate each one, and make them interchangeable at declaration time."
type: cue
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Algorithms"
formula: |2
  package wards
  
  // The Strategy Interface
  #ValidationStrategy: {
  	name: string
  	// A constraint to be applied to a target string
  	check: string
  }
  
  // Concrete Strategy: Strict Alphanumeric
  #StrictStrategy: #ValidationStrategy & {
  	name: "Strict-AlphaNum"
  	check: =~"^[a-zA-Z0-9]+$"
  }
  
  // Concrete Strategy: Hexadecimal
  #HexStrategy: #ValidationStrategy & {
  	name: "Hex-Only"
  	check: =~"^0x[a-fA-F0-9]+$"
  }
  
  // The Context
  #WardInputValidator: {
  	// The injected strategy
  	strategy: #ValidationStrategy
  	
  	// The data to validate
  	payload: string
  	
  	// Apply the strategy's constraint to the data
  	payload: strategy.check
  }
  
  // Usage
  validator_1: #WardInputValidator & {
  	strategy: #StrictStrategy
  	payload: "SecureData123" // Valid
  }
  
  validator_2: #WardInputValidator & {
  	strategy: #HexStrategy
  	payload: "0xDEADBEEF" // Valid
  }
  
  // validator_3: #WardInputValidator & {
  // 	strategy: #HexStrategy
  // 	payload: "NotHex" // Unification Error!
  // }
tags: [strategy, behavioral, cue, evocation, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When guarding the gateway to the cyber-astral plane, a **Lattice Data Validation Ward** must inspect incoming payloads. However, the exact rules of inspection—the validation algorithms—often need to be swapped out based on the specific threat vector.

The **Strategy** pattern handles this perfectly. We define independent schemas like `#StrictStrategy` and `#HexStrategy` that encapsulate a specific Regex constraint (`check`). The `#WardInputValidator` acts as the context, accepting an injected strategy. It then dynamically binds the strategy's `check` constraint to its own `payload` field. This allows you to interchange complex validation algorithms at deployment time without altering the context's core structure.
