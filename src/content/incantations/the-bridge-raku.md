---
title: Bridge
description: Decoupling a spell's temporal nature from the celestial power source fueling it.
type: raku
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Channeling"
formula: |2
  role CelestialPower {
      method channel-energy() { ... }
  }

  class LunarEclipse does CelestialPower {
      method channel-energy() { "the mysterious gravity of the Lunar Eclipse" }
  }

  class SolarFlare does CelestialPower {
      method channel-energy() { "the blazing fury of a Solar Flare" }
  }

  class Ritual {
      has CelestialPower $.power;
      
      method enact() { ... }
  }

  class HundredYearRitual is Ritual {
      method enact() {
          say "The Hundred-Year Spell begins, fueled by ", $.power.channel-energy(), "!";
      }
  }

  my $ritual = HundredYearRitual.new(power => LunarEclipse.new);
  $ritual.enact();
tags: [structural, bridge, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A Hundred-Year Spell requires immense power to sustain itself. By using the Bridge pattern, we separate the structure of the ritual itself from the cosmic phenomena that fuel it. A ritual can easily be re-pointed to draw from a solar flare or a lunar eclipse without fundamentally changing the spell's internal incantations.
