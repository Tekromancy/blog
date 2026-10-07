---
title: The Composite
description: Composes arcane components into tree structures to represent part-whole hierarchies.
type: tcl
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Weaving"
formula: |2
  oo::class create GlyphNode {
      method activate {} { error "Not implemented" }
  }

  oo::class create SimpleGlyph {
      superclass GlyphNode
      variable name
      constructor {n} { set name $n }
      method activate {} { puts "Activating glyph: $name" }
  }

  oo::class create GlyphCluster {
      superclass GlyphNode
      variable children
      constructor {} { set children {} }
      method add {child} { lappend children $child }
      method activate {} {
          puts "Activating cluster..."
          foreach child $children {
              $child activate
          }
      }
  }

  set root [GlyphCluster new]
  set nodeA [SimpleGlyph new "Alpha"]
  set sub [GlyphCluster new]
  $sub add [SimpleGlyph new "Beta"]
  $sub add [SimpleGlyph new "Gamma"]

  $root add $nodeA
  $root add $sub

  $root activate
tags: [structural, composite, weaving, hierarchies]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite

A single glyph is weak, but a fractal lattice of interconnected runes can bypass the most formidable ICE. The Composite pattern treats individual sigils and immense clusters of logic as identical constructs, allowing recursive detonation of magical force down the entire system tree.
