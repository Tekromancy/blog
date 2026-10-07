---
title: State
description: Altering the spell's fundamental behavior as it transitions through the decades.
type: raku
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  class SpellContext { ... }

  role SpellState {
      method handle-time-passage(SpellContext $ctx) { ... }
  }

  class DormantState does SpellState {
      method handle-time-passage(SpellContext $ctx) {
          say "The spell is Dormant. Accumulating energy silently.";
          # Transition to active after enough time
          $ctx.set-state(ActiveState.new);
      }
  }

  class ActiveState does SpellState {
      method handle-time-passage(SpellContext $ctx) {
          say "The spell is Active! Unleashing a century of stored fury.";
          # Transition to dissipating
          $ctx.set-state(DissipatingState.new);
      }
  }

  class DissipatingState does SpellState {
      method handle-time-passage(SpellContext $ctx) {
          say "The spell is Dissipating. Returning energy to the ley lines.";
      }
  }

  class SpellContext {
      has SpellState $!state;
      
      submethod BUILD() {
          $!state = DormantState.new;
      }
      
      method set-state(SpellState $s) {
          $!state = $s;
      }
      
      method pass-decade() {
          $!state.handle-time-passage(self);
      }
  }

  my $spell = SpellContext.new;
  $spell.pass-decade(); # Dormant -> Active
  $spell.pass-decade(); # Active -> Dissipating
  $spell.pass-decade(); # Dissipating
tags: [behavioral, state, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A spell cast to last a hundred years does not remain static. It has seasons: a dormant incubation, a violent manifestation, and a slow dissipation. The State pattern allows the spell to change its fundamental behavior depending on its current internal state, transitioning smoothly through the epochs of its existence.
