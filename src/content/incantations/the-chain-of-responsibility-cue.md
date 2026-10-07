---
title: "The Chain of Responsibility: Cascading Constraints"
description: "Pass configuration data along a chain of specialized validation schemas until all constraints are satisfied."
type: cue
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Cascading Checks"
formula: |2
  package wards
  
  // The Request payload
  #WardRequest: {
  	domain: string
  	intensity: int
  	signature: string
  }
  
  // Handler 1: Intensity Checker
  #CheckIntensity: {
  	req: #WardRequest
  	// Constraint applied
  	req: { intensity: >= 10 }
  }
  
  // Handler 2: Domain Checker
  #CheckDomain: {
  	req: #WardRequest
  	// Constraint applied
  	req: { domain: =~"\\.arcana$" }
  }
  
  // Handler 3: Signature Checker
  #CheckSignature: {
  	req: #WardRequest
  	// Constraint applied
  	req: { signature: != "" }
  }
  
  // The Chain definition: composing the handlers
  // In CUE, the chain is evaluated concurrently through unification,
  // but conceptually it represents a series of required validations.
  #ValidationChain: {
  	input: #WardRequest
  	
  	// Execute all links in the chain against the same input
  	_link1: #CheckIntensity & { req: input }
  	_link2: #CheckDomain & { req: _link1.req }
  	_link3: #CheckSignature & { req: _link2.req }
  	
  	// Final output if the chain succeeds
  	validated: _link3.req
  }
  
  // Usage
  myRequest: {
  	domain: "gateway.arcana"
  	intensity: 50
  	signature: "ValidSig"
  }
  
  process: #ValidationChain & {
  	input: myRequest
  }
tags: [chain-of-responsibility, behavioral, cue, cascading-checks, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In dynamic systems, a configuration request might need to pass through multiple distinct validation checks—verifying intensity, domain origins, and cryptographic signatures. 

The **Chain of Responsibility** in a **Lattice Data Validation Ward** leverages CUE's ability to unify constraints in sequence (conceptually, though evaluation is mathematically simultaneous). We define individual "Handler" schemas (`#CheckIntensity`, `#CheckDomain`). The `#ValidationChain` threads the `req` payload through each handler. If any link in the chain fails its constraint, the entire CUE evaluation yields an error. This keeps validation logic isolated, modular, and easy to append to.
