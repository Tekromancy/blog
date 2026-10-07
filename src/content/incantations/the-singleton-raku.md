---
title: Singleton
description: Guaranteeing only one temporal anchor exists for a century-long working.
type: raku
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Stasis"
formula: |2
  class TemporalAnchor {
      my TemporalAnchor $instance;
      
      method instance() {
          $instance //= self.bless;
          return $instance;
      }
      
      submethod BUILD() {
          say "The singular Temporal Anchor for the Hundred-Year Spell is forged in the void.";
      }
      
      method stabilize() {
          say "Decades pass, but the anchor holds steady against the currents of time.";
      }
  }

  my $anchor1 = TemporalAnchor.instance();
  $anchor1.stabilize();

  my $anchor2 = TemporalAnchor.instance();
  say "Are they the same anchor? ", $anchor1 === $anchor2;
tags: [creational, singleton, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

To cast a spell that bridges centuries, one must establish a Temporal Anchor. Should multiple anchors be accidentally summoned, the conflicting gravitational pulls would tear the fabric of space-time. The Singleton pattern ensures our Hundred-Year Spell remains anchored to precisely one immutable point.
