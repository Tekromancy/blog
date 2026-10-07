---
title: "The Builder Incantation in Carbon"
description: "Construct complex cyber-golems step by step, shielding the manifestation logic from the assembly grid."
type: carbon
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Golemancy"
formula: |2
  package Builder api;

  class CyberGolem {
    var core: String;
    var plating: String;
    var weapon: String;
  }

  interface GolemBuilder {
    fn SetCore[addr me: Self*](core: String);
    fn SetPlating[addr me: Self*](plating: String);
    fn SetWeapon[addr me: Self*](weapon: String);
    fn GetResult[me: Self]() -> CyberGolem;
  }

  class ConcreteGolemBuilder {
    var golem: CyberGolem;

    fn Create() -> ConcreteGolemBuilder {
      var builder: ConcreteGolemBuilder = {.golem = {.core = "", .plating = "", .weapon = ""}};
      return builder;
    }

    impl as GolemBuilder {
      fn SetCore[addr me: Self*](core: String) { (*me).golem.core = core; }
      fn SetPlating[addr me: Self*](plating: String) { (*me).golem.plating = plating; }
      fn SetWeapon[addr me: Self*](weapon: String) { (*me).golem.weapon = weapon; }
      fn GetResult[me: Self]() -> CyberGolem { return me.golem; }
    }
  }
tags: [creational, carbon, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Builder: Assembly of the Carbon Chassis

To build a cyber-golem in the volatile age of the Successor Pact, one cannot simply slam raw memory together with `new` and pray to the segfault deities. The Builder pattern orchestrates the slow, safe, memory-checked construction of your most complex entities.

By isolating the assembly sequence from the representation, an Archmage of Carbon can swap out builders to produce variations of the golem—from stealth-focused infiltration constructs to heavy plasma-wielding behemoths—all while retaining strict type safety and interoperability with legacy C++ systems.
