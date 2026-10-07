---
title: The Chain of Responsibility
description: Passes an arcane event along a chain of handlers until one resolves it.
type: tcl
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Filtering"
formula: |2
  oo::class create Ward {
      variable nextWard
      constructor {} { set nextWard "" }
      method setNext {w} { set nextWard $w }
      method handle {threat} {
          if {$nextWard ne ""} {
              $nextWard handle $threat
          } else {
              puts "Threat '$threat' bypassed all wards!"
          }
      }
  }

  oo::class create FireWall {
      superclass Ward
      method handle {threat} {
          if {$threat eq "FlameVirus"} {
              puts "FireWall neutralized $threat."
          } else {
              next $threat
          }
      }
  }

  oo::class create IceWall {
      superclass Ward
      method handle {threat} {
          if {$threat eq "CryoWorm"} {
              puts "IceWall shattered $threat."
          } else {
              next $threat
          }
      }
  }

  set w1 [FireWall new]
  set w2 [IceWall new]
  $w1 setNext $w2

  $w1 handle "CryoWorm"
  $w1 handle "ShadowTrojan"
tags: [behavioral, chain of responsibility, filtering, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility

A monolithic defense is easily circumvented. Instead, we layer our wards like a string of cascading pearls. An incoming curse strikes the outer shell; if it is unrecognized, the event is cast deeper into the chain. TclOO's `next` command makes this delegation feel like a natural flow of mystical current.
