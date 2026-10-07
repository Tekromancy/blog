---
title: Adapter
description: Fitting a short-term hedge charm into the grand framework of a century spell.
type: raku
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Alteration"
formula: |2
  # The old, incompatible magic
  class HedgeCharm {
      method cast-charm(Int $minutes) {
          say "Casting a minor charm for $minutes minutes.";
      }
  }

  # The expected interface for high-magic
  role CenturyMagic {
      method cast-century-spell(Int $centuries) { ... }
  }

  # The Adapter bridging the two
  class CharmToCenturyAdapter does CenturyMagic {
      has HedgeCharm $!charm .= new;
      
      method cast-century-spell(Int $centuries) {
          my $minutes = $centuries * 100 * 365 * 24 * 60;
          say "Adapting the hedge charm's temporal parameters for a grand epoch...";
          $!charm.cast-charm($minutes);
      }
  }

  my CenturyMagic $spell = CharmToCenturyAdapter.new;
  $spell.cast-century-spell(1);
tags: [structural, adapter, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Sometimes, a humble charm discovered in a forgotten grimoire is exactly what a grand working needs. However, hedge magic measures time in fleeting minutes, while our Hundred-Year Spell demands centuries. The Adapter pattern translates the temporal flow, embedding short-lived magic into a generational matrix.
