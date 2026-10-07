---
title: The Flyweight
description: Uses sharing to support large numbers of fine-grained magical entities efficiently.
type: tcl
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Optimization"
formula: |2
  oo::class create RuneParticle {
      variable intrinsicColor
      constructor {color} { set intrinsicColor $color }
      method display {x y} {
          puts "Rendering $intrinsicColor rune at $x, $y"
      }
  }

  oo::class create RuneFactory {
      variable cache
      constructor {} { set cache [dict create] }
      method getRune {color} {
          if {![dict exists $cache $color]} {
              dict set cache $color [RuneParticle new $color]
          }
          return [dict get $cache $color]
      }
  }

  set factory [RuneFactory new]
  set r1 [$factory getRune "NeonPink"]
  set r2 [$factory getRune "NeonPink"]

  $r1 display 10 20
  $r2 display 50 80

  puts "Are they the same object? [expr {$r1 eq $r2}]"
tags: [structural, flyweight, optimization, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight

When unleashing a swarm of ten thousand nano-runes, instantiating each individually will shatter the JVM—or in this realm, the Tcl interpreter's memory limit. The Flyweight binds the intrinsic, unchanging properties to a shared essence, forcing the swarm to share memory. It is efficient, brutal, and elegant.
