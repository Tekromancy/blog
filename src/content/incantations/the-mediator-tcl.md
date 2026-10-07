---
title: The Mediator
description: Reduces chaotic dependencies between spellcasting components by forcing them to communicate via a central hub.
type: tcl
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  oo::class create Mediator {
      method notify {sender event} { error "Not implemented" }
  }

  oo::class create CentralHub {
      superclass Mediator
      variable componentA componentB
      method setA {a} { set componentA $a }
      method setB {b} { set componentB $b }

      method notify {sender event} {
          if {$event eq "A_triggered"} {
              puts "Hub detects A's action. Triggering B's reaction..."
              $componentB react
          }
      }
  }

  oo::class create Component {
      variable mediator
      constructor {m} { set mediator $m }
  }

  oo::class create TriggerNode {
      superclass Component
      method trigger {} {
          puts "Node triggered."
          $mediator notify [self] "A_triggered"
      }
  }

  oo::class create ReactorNode {
      superclass Component
      method react {} { puts "Node reacts to the cosmic shift." }
  }

  set hub [CentralHub new]
  set nodeA [TriggerNode new $hub]
  set nodeB [ReactorNode new $hub]
  $hub setA $nodeA
  $hub setB $nodeB

  $nodeA trigger
tags: [behavioral, mediator, synchronization, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator

When dozens of independent runes attempt to cross-communicate, the resulting feedback loop will fry the local grid. The Mediator establishes a Central Hub—an overseer daemon that intercepts all whispers and routes them safely to their destinations, keeping the individual spells ignorant of each other.
