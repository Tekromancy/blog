---
title: "The Adapter Incantation in Carbon"
description: "Bridge the incompatibility gap between modern Carbon interfaces and ancient C++ legacy artifacts."
type: carbon
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  package Adapter api;

  // The Modern Interface we want
  interface NeuralLink {
    fn Connect[me: Self]() -> String;
  }

  // The Legacy Class (simulating C++ interop)
  class OldCopperWire {
    fn Splice[me: Self]() -> String {
      return "Sputtering copper connection...";
    }
  }

  // The Adapter
  class WireToNeuralAdapter {
    var legacy_wire: OldCopperWire;

    impl as NeuralLink {
      fn Connect[me: Self]() -> String {
        // Translating the legacy call to the modern interface
        return me.legacy_wire.Splice();
      }
    }
  }
tags: [structural, carbon, interoperability]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Adapter: Translators of the Successor Pact

The true power of the Successor Pact lies not just in discarding the old, but in mastering it. Carbon was designed with seamless bi-directional C++ interoperability. The Adapter pattern is the formal expression of this bridge.

When your pristine `NeuralLink` interface requires data from an ancient `OldCopperWire` class deep within a legacy C++ codebase, the Adapter wraps the old logic, translating its sputtering outputs into smooth, statically-checked Carbon signals.
