---
title: "The Facade Incantation in Carbon"
description: "Provide a simplified, unified interface to a complex and chaotic subsystem."
type: carbon
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  package Facade api;

  class SubsystemA {
    fn SpinUp[me: Self]() -> String { return "A spinning up"; }
  }

  class SubsystemB {
    fn Calibrate[me: Self]() -> String { return "B calibrating"; }
  }

  class SubsystemC {
    fn Fire[me: Self]() -> String { return "C firing"; }
  }

  class SystemFacade {
    var a: SubsystemA;
    var b: SubsystemB;
    var c: SubsystemC;

    fn ExecuteStrike[me: Self]() -> String {
      return me.a.SpinUp() + ", " + me.b.Calibrate() + ", " + me.c.Fire();
    }
  }
tags: [structural, carbon, simplification]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Facade: The Monolithic Veil

Behind the neon signs and chrome exteriors of the city's megacorps lie chaotic tangles of legacy C++ subsystems, deeply intertwined and volatile. The Facade pattern drops a veil over this complexity.

By creating a `SystemFacade` in Carbon, we expose a single, clean API to the client. The client calls `ExecuteStrike`, completely unaware of the intricate dance of `SubsystemA`, `B`, and `C` required to execute it. It protects the sane, modern Carbon code from the maddening intricacies of the underlying architecture.
