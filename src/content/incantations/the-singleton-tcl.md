---
title: The Singleton
description: Ensures a magical locus has only one active instantiation in the realm.
type: tcl
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Nexus"
formula: |2
  oo::class create Nexus {
      variable energyLevel
      constructor {} {
          set energyLevel 100
      }
      method draw {amount} {
          set energyLevel [expr {$energyLevel - $amount}]
          puts "Nexus energy at: $energyLevel"
      }
  }

  # The Tcl trick for singletons: an object command that doesn't allow new instances easily
  # Or simply creating a single instance and restricting the class.
  Nexus create TheOneNexus

  # Redefining the 'new' and 'create' methods to prevent further instantiation
  oo::objdefine Nexus {
      method create {name args} { error "Cannot instantiate Singleton. Use TheOneNexus." }
      method new {args} { error "Cannot instantiate Singleton. Use TheOneNexus." }
  }

  TheOneNexus draw 10
tags: [creational, singleton, nexus, tcloo]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Singleton

A true Nexus of power cannot be multiplied without risking reality distortion. The Singleton enforces a universal truth: there is only one source. Through overriding TclOO's object creation commands, we seal the class, forbidding any further instantiations and cementing the singular node of truth.
