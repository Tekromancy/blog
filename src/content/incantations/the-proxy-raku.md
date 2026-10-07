---
title: Proxy
description: Guarding access to the dangerous true Grimoire of the Hundred-Year Spells.
type: raku
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  role Grimoire {
      method read-spell(Str $name) { ... }
  }

  class AncientGrimoire does Grimoire {
      submethod BUILD() {
          say "Breaking the physical seals and opening the heavy, dust-covered Grimoire... (Heavy I/O)";
      }
      
      method read-spell(Str $name) {
          say "Reading the dark, mind-bending secrets of the spell: $name.";
      }
  }

  class GrimoireProxy does Grimoire {
      has AncientGrimoire $!real-grimoire;
      has Bool $.is-archmage is rw = False;
      
      method read-spell(Str $name) {
          unless $.is-archmage {
              say "Access Denied: Only an Archmage has the mental fortitude to read the Hundred-Year Spells.";
              return;
          }
          
          # Lazy initialization
          $!real-grimoire //= AncientGrimoire.new;
          $!real-grimoire.read-spell($name);
      }
  }

  my $proxy = GrimoireProxy.new;
  $proxy.read-spell("Temporal Stagnation"); # Denied
  
  $proxy.is-archmage = True;
  $proxy.read-spell("Temporal Stagnation"); # Allowed
tags: [structural, proxy, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The knowledge required to cast a Hundred-Year Spell is dangerous, capable of snapping an untrained mind. Furthermore, physically retrieving the ancient text is costly. The Proxy pattern serves as a warden, checking credentials and only loading the true Grimoire into memory when an authenticated Archmage absolutely needs it.
