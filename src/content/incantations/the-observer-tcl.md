---
title: The Observer
description: Defines a one-to-many dependency, alerting all bonded familiars when a core locus changes state.
type: tcl
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Binding"
formula: |2
  oo::class create LeylineCore {
      variable familiars state
      constructor {} { set familiars {}; set state "Stable" }

      method attach {familiar} { lappend familiars $familiar }
      method setState {newState} {
          set state $newState
          my notify
      }
      method notify {} {
          foreach f $familiars {
              $f update $state
          }
      }
  }

  oo::class create DaemonFamiliar {
      variable name
      constructor {n} { set name $n }
      method update {state} {
          puts "Familiar $name feels the tremor: Leyline is now $state"
      }
  }

  set core [LeylineCore new]
  $core attach [DaemonFamiliar new "Null"]
  $core attach [DaemonFamiliar new "Void"]

  $core setState "Corrupted by Neon"
tags: [behavioral, observer, event-loop, bindings]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer

Magic in Tcl is inherently event-driven. The Observer pattern formally binds multiple daemon familiars to a central energy core. When the core pulses with an anomalous spike, the change ripples through the event loop, notifying all bound entities synchronously to react.
