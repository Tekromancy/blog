---
title: "The Decorator: Layered Abjurations"
description: "Dynamically add responsibilities and constraints to a ward matrix through successive unification."
type: cue
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Layering"
formula: |2
  package wards
  
  // Base Component
  #CoreWard: {
  	matrix: string
  	cost: int
  	tags: [...string]
  }
  
  // Decorator 1: Add Encryption
  #EncryptedWard: {
  	// The decorator unifies with the base, extending it
  	cost: >= 10 // Encryption adds to minimum cost
  	tags: [...string] | *["encrypted"]
  	algorithm: string | *"AES-GCM-256"
  }
  
  // Decorator 2: Add Chrono-Lock
  #ChronoLockedWard: {
  	cost: >= 50
  	tags: [...string] | *["chrono-locked"]
  	duration: string & =~"^[0-9]+h$"
  }
  
  // Usage: We start with a base ward
  base: #CoreWard & {
  	matrix: "Hex-Base"
  	cost: 5
  	tags: ["standard"]
  }
  
  // We decorate it by unifying it with the decorator schemas
  // Because CUE order doesn't matter, decoration is just intersection (&&)
  fullyDecoratedWard: base & #EncryptedWard & #ChronoLockedWard & {
  	// We must satisfy the combined constraints
  	cost: 60 // Satisfies base (5), Encrypted (>=10), Chrono (>=50)
  	duration: "24h"
  	tags: ["standard", "encrypted", "chrono-locked"]
  }
tags: [decorator, structural, cue, abjuration, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In traditional OOP, the **Decorator** pattern wraps objects at runtime to alter behavior. In the realm of CUE and **Lattice Data Validation Wards**, decoration is simply the mathematical intersection (unification) of schemas.

By defining layers of abjurations—like `#EncryptedWard` or `#ChronoLockedWard`—as open schemas with their own localized constraints, you can "decorate" a base ward just by unifying them with `&`. The resulting configuration is instantaneously validated against the combined ruleset of the base and all its decorators, preventing invalid magic from ever being cast.
