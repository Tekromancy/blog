---
title: Memento
description: Capturing and restoring the precise state of a spell spanning a century.
type: raku
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Stasis"
formula: |2
  class SpellMemento {
      has Int $.intensity;
      has Str $.phase;
  }

  class CenturySpell {
      has Int $.intensity is rw = 10;
      has Str $.phase is rw = "Initiation";
      
      method save-state(--> SpellMemento) {
          say "Preserving the spell state in amber... (Phase: $!phase)";
          return SpellMemento.new(intensity => $!intensity, phase => $!phase);
      }
      
      method restore-state(SpellMemento $m) {
          $!intensity = $m.intensity;
          $!phase = $m.phase;
          say "Spell state restored from amber... (Phase: $!phase)";
      }
      
      method mutate() {
          $!intensity += 50;
          $!phase = "Degradation";
          say "Spell mutated... (Phase: $!phase)";
      }
  }

  my $spell = CenturySpell.new;
  my $memento = $spell.save-state();

  $spell.mutate();

  say "Something went wrong! Reverting to previous epoch...";
  $spell.restore-state($memento);
tags: [behavioral, memento, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A spell cast to endure a hundred years will likely face interference. The Memento pattern allows an Archmage to capture the internal state of the spell in a crystalline snapshot. If the magic begins to unravel or mutate dangerously, the spell can be cleanly reverted to its previously stable state without exposing its delicate internal variables.
