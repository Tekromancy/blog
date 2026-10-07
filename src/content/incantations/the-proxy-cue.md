---
title: "The Proxy: The Guardian Schema"
description: "Control access to a sensitive core schema through a proxy schema that enforces strict pre-conditions."
type: cue
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Guardian Wards"
formula: |2
  package wards
  
  // The core, sensitive schema (RealSubject)
  // We make it hidden using an underscore so it cannot be instantiated directly
  _#InnerSanctumConfig: {
  	access_code: string
  	allow_destructive_spells: bool
  }
  
  // The Proxy Schema
  #SanctumProxy: {
  	// Request context
  	user_role: "apprentice" | "mage" | "archmage"
  	
  	// The configuration to be passed to the inner sanctum
  	config: {
  		access_code: string
  		allow_destructive_spells: bool
  	}
  	
  	// Access Control Logic (The Proxy)
  	// Enforce constraints on the config based on the user's role
  	if user_role == "apprentice" {
  		config: {
  			allow_destructive_spells: false
  		}
  	}
  	if user_role == "mage" || user_role == "archmage" {
  		// No restriction on destructive spells, but validation still applies
  	}
  	
  	// Ensure the config actually conforms to the hidden RealSubject
  	_validation: _#InnerSanctumConfig & config
  }
  
  // Usage
  // Safe attempt
  apprentice_attempt: #SanctumProxy & {
  	user_role: "apprentice"
  	config: {
  		access_code: "1234"
  		allow_destructive_spells: false
  	}
  }
  
  // Failing attempt: Unification error due to Proxy constraint
  // bad_attempt: #SanctumProxy & {
  // 	user_role: "apprentice"
  // 	config: {
  // 		access_code: "5678"
  // 		allow_destructive_spells: true // FAILS: proxy forces false
  // 	}
  // }
tags: [proxy, structural, cue, abjuration, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Directly interacting with the core configuration of a **Lattice Data Validation Ward** can be dangerous, especially if it controls destructive un-binding spells. 

By employing the **Proxy** pattern in CUE, we encapsulate the sensitive `#InnerSanctumConfig` as a hidden structure (using `_#`). Users must interface with the `#SanctumProxy` schema instead. The proxy inspects environmental or contextual data (like `user_role`) and applies conditional constraints to the incoming configuration *before* unifying it with the hidden core. This acts as an impenetrable guardian ward, terminating the evaluation immediately if unauthorized access parameters are attempted.
