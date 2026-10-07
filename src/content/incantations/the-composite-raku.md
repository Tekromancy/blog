---
title: Composite
description: Treating individual hexes and vast spell matrices as a singular entity.
type: raku
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Weaving"
formula: |2
  role SpellComponent {
      method invoke() { ... }
  }

  class SingleHex does SpellComponent {
      has Str $.name;
      method invoke() { say "  -> Invoking subtle hex: $!name" }
  }

  class CenturySpellMatrix does SpellComponent {
      has SpellComponent @.components;
      has Str $.matrix-name;
      
      method add(SpellComponent $c) { @!components.push($c) }
      
      method invoke() {
          say "Initiating Matrix: $!matrix-name (Duration: 100 Years)";
          for @!components -> $c {
              $c.invoke();
          }
      }
  }

  my $hex1 = SingleHex.new(name => "Temporal Stutter");
  my $hex2 = SingleHex.new(name => "Memory Fog");

  my $sub-matrix = CenturySpellMatrix.new(matrix-name => "Cognitive Dampening");
  $sub-matrix.add($hex1);
  $sub-matrix.add($hex2);

  my $grand-matrix = CenturySpellMatrix.new(matrix-name => "The Hundred-Year Sleep");
  $grand-matrix.add($sub-matrix);
  $grand-matrix.add(SingleHex.new(name => "Slumbering Root"));

  $grand-matrix.invoke();
tags: [structural, composite, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A spell designed to span centuries is rarely a single, monolithic chant. It is a woven tapestry of lesser hexes, wards, and nested matrices. The Composite pattern allows an Archmage to invoke the overarching Hundred-Year Matrix just as easily as they would a simple cantrip.
