---
title: Strategy
description: Hot-swapping defensive algorithms as a century ward encounters new threats.
type: raku
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Abjuration // Tactics"
formula: |2
  role DefenseStrategy {
      method defend(Str $threat) { ... }
  }

  class DeflectStrategy does DefenseStrategy {
      method defend(Str $threat) {
          say "Deflecting the $threat back at the attacker.";
      }
  }

  class AbsorbStrategy does DefenseStrategy {
      method defend(Str $threat) {
          say "Absorbing the $threat into the ward's power reserves.";
      }
  }

  class CenturyWard {
      has DefenseStrategy $.strategy is rw;
      
      method handle-attack(Str $threat) {
          say "Ward detects: $threat";
          $.strategy.defend($threat);
      }
  }

  my $ward = CenturyWard.new(strategy => DeflectStrategy.new);
  $ward.handle-attack("Fireball");

  say "\nThe threat environment changes. Switching to Absorption...";
  $ward.strategy = AbsorbStrategy.new;
  $ward.handle-attack("Necrotic Ray");
tags: [behavioral, strategy, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Over a century, the types of magical attacks leveled against a ward will evolve. A rigid defense will shatter. The Strategy pattern enables the Century Ward to hot-swap its defensive algorithms at runtime—shifting from deflection to absorption—depending on the nature of the incoming threat.
