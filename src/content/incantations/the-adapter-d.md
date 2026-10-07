---
title: Adapter
description: Bridge incompatible mystical traditions, allowing ancient runes to channel modern mana systems.
type: d
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Rune Bridging"
formula: |2
  interface ModernManaSystem { void routeMana(); }
  class AncientLeyline { void tapLeyline() {} }

  class LeylineAdapter : ModernManaSystem {
      private AncientLeyline leyline;
      this(AncientLeyline l) { leyline = l; }
      override void routeMana() { leyline.tapLeyline(); }
  }
tags: [structural, adapter, dlang, integration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Converts archaic interfaces into standard invocations.
