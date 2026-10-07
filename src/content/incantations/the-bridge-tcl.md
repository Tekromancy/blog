---
title: The Bridge
description: Decouples a magical abstraction from its implementation so the two can vary independently.
type: tcl
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Alteration // Channeling"
formula: |2
  oo::class create Wand {
      method channel {} { error "Not implemented" }
  }
  oo::class create NeonWand { method channel {} { puts "Channeling neon-infused plasma..." } }
  oo::class create BoneWand { method channel {} { puts "Channeling necrotic resonance..." } }

  oo::class create Spell {
      variable wand
      constructor {w} { set wand $w }
      method cast {} {
          $wand channel
          puts "Releasing spell!"
      }
  }

  set neon [NeonWand new]
  set spark [Spell new $neon]
  $spark cast
tags: [structural, bridge, alteration, channeling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge

The true power of an incantation should not be hardcoded to the conduit it flows through. A Bridge severs the hard link between a Spell and its Foci (the Wand), allowing you to swap a frail bone artifact for a high-density neon rod without altering the ritual's core structure.
