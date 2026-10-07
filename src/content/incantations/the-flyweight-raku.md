---
title: Flyweight
description: Sharing immutable rune data to prevent memory collapse during a massive spell working.
type: raku
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Evocation // Inscription"
formula: |2
  class RuneFlyweight {
      has Str $.symbol;
      has Str $.essence;
      
      # Intrinsic, immutable state
      submethod BUILD(:$!symbol, :$!essence) {
          say "Forging the primal concept of Rune '$!symbol' ($!essence)...";
      }
      
      method manifest(Str $location) {
          say "Rune $!symbol ($!essence) pulses faintly at $location.";
      }
  }

  class RuneFactory {
      my %!runes;
      
      method get-rune(Str $symbol, Str $essence --> RuneFlyweight) {
          %!runes{$symbol} //= RuneFlyweight.new(:$symbol, :$essence);
          return %!runes{$symbol};
      }
  }

  my $factory = RuneFactory.new;
  
  # A 100-year spell might require thousands of runes. 
  # We share the heavy, intrinsic state.
  my @locations = <North-Tower East-Gate Crypt Dungeon>;
  for @locations -> $loc {
      my $rune = $factory.get-rune('ᛃ', 'Time');
      $rune.manifest($loc);
  }
tags: [structural, flyweight, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When inscribed across an entire kingdom to enforce a century-long edict, a spell might utilize millions of individual runes. Manifesting each as a unique magical object would exhaust the caster's mind (and the system's memory). The Flyweight pattern shares the intrinsic magical essence of the rune, only calculating its extrinsic state—like location—at the moment of manifestation.
