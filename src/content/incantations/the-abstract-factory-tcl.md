---
title: The Abstract Factory
description: A central node that spawns related families of magical constructs without specifying their concrete classes.
type: tcl
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matrix"
formula: |2
  oo::class create AbstractFactory {
      method createOffense {} { error "Not implemented" }
      method createDefense {} { error "Not implemented" }
  }

  oo::class create CyberOffense { method execute {} { puts "Executing Neon-Hex Injection..." } }
  oo::class create CyberDefense { method execute {} { puts "Deploying ICE Firewall..." } }

  oo::class create CyberFactory {
      superclass AbstractFactory
      method createOffense {} { return [CyberOffense new] }
      method createDefense {} { return [CyberDefense new] }
  }

  oo::class create BioOffense { method execute {} { puts "Casting Neuro-Toxin Curse..." } }
  oo::class create BioDefense { method execute {} { puts "Growing Chitinous Shielding..." } }

  oo::class create BioFactory {
      superclass AbstractFactory
      method createOffense {} { return [BioOffense new] }
      method createDefense {} { return [BioDefense new] }
  }

  # Usage
  set factory [CyberFactory new]
  set spell [$factory createOffense]
  $spell execute
  $spell destroy
tags: [creational, factory, tcloo, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Abstract Factory

In the string-laden weave of Tcl, the Abstract Factory is a nexus of creation. It binds families of glyphs and hexes together under a singular interface, ensuring that cyber-spells and bio-wards are never mistakenly crossed in the heat of a system breach. With TclOO, the inheritance tree ensures precise manifestation of the required arcane constructs.
