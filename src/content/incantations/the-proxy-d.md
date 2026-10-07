---
title: Proxy
description: Control access to a potent, dangerous demonic entity, deferring its invocation until absolutely necessary.
type: d
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Demonic Containment"
formula: |2
  interface IDemon { void unleash(); }

  class PitFiend : IDemon {
      this() { /* Costly summoning */ }
      override void unleash() {}
  }

  class BoundDemonProxy : IDemon {
      private PitFiend realDemon;
      override void unleash() {
          if (realDemon is null) realDemon = new PitFiend();
          realDemon.unleash();
      }
  }
tags: [structural, proxy, dlang, lazy-evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A magical contract that postpones the instantiation of forbidden rituals.
