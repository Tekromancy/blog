---
title: The Builder
description: Constructs complex magical sigils step by step, separating construction from representation.
type: tcl
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Sigilcraft"
formula: |2
  oo::class create RitualBuilder {
      variable steps
      constructor {} { set steps {} }
      method addChant {chant} { lappend steps "Chanting: $chant" }
      method addComponent {comp} { lappend steps "Consuming: $comp" }
      method getRitual {} { return [join $steps "\n"] }
  }

  oo::class create Director {
      method constructCyberRitual {builder} {
          $builder addChant "01001000 01100101 01111000"
          $builder addComponent "Silicon Wafer"
          $builder addComponent "Neon Phosphor"
      }
  }

  set builder [RitualBuilder new]
  set director [Director new]
  $director constructCyberRitual $builder
  puts "Ritual Prepared:\n[$builder getRitual]"
tags: [creational, builder, tcloo, sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Builder

When complex incantations require multiple phases of alignment—gathering reagents, syncing frequencies, bypassing ICE—the Builder pattern orchestrates the assembly. In Tcl, where strings are the ultimate medium, the Builder carefully appends the cosmic bytecode until the final payload is ready for execution.
