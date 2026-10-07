---
title: The Memento
description: Captures and externalizes a spell's internal state so it can be restored later without violating encapsulation.
type: tcl
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // TimeWeaving"
formula: |2
  oo::class create SoulGem {
      variable state
      constructor {s} { set state $s }
      method getState {} { return $state }
  }

  oo::class create CyberWarlock {
      variable powerLevel
      constructor {} { set powerLevel 100 }
      method cast {} {
          set powerLevel [expr {$powerLevel - 20}]
          puts "Spell cast. Power level now $powerLevel."
      }
      method saveState {} { return [SoulGem new $powerLevel] }
      method restoreState {gem} {
          set powerLevel [$gem getState]
          puts "Time reversed. Power level restored to $powerLevel."
      }
  }

  set warlock [CyberWarlock new]
  set snapshot [$warlock saveState]

  $warlock cast
  $warlock cast

  $warlock restoreState $snapshot
tags: [behavioral, memento, chronomancy, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento

In the unstable realm of Tekromancy, fatal errors are inevitable. The Memento is a Chronomantic anchor, capturing the raw state of a system and preserving it in a crystalline object. When execution inevitably leads to corruption, the Warlock simply shatters the gem, rewinding state to a flawless point in time.
