---
title: "The Factory Method Incantation in Carbon"
description: "Delegate the exact class of a summoned entity to the subclasses that implement the summoning circle."
type: carbon
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  package FactoryMethod api;

  interface ArcaneEntity {
    fn Manifest[me: Self]() -> String;
  }

  class NeonPhantom {
    impl as ArcaneEntity {
      fn Manifest[me: Self]() -> String { return "A phantom of neon emerges."; }
    }
  }

  class ChromiumSprite {
    impl as ArcaneEntity {
      fn Manifest[me: Self]() -> String { return "A sprite of chromium darts by."; }
    }
  }

  interface Summoner {
    fn Summon[me: Self]() -> auto;
  }

  class PhantomSummoner {
    impl as Summoner {
      fn Summon[me: Self]() -> auto { return NeonPhantom(); }
    }
  }

  class SpriteSummoner {
    impl as Summoner {
      fn Summon[me: Self]() -> auto { return ChromiumSprite(); }
    }
  }
tags: [creational, carbon, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Factory Method: The Summoner's Discretion

In the Carbon ecosystem, where interfaces and implementations cleanly detach, the Factory Method thrives. It allows the core summoning engine to orchestrate the ritual without knowing the exact entity being summoned. 

The Successor Pact dictates that we must avoid the tight coupling that plagued our ancestors. By utilizing the Factory Method, a `Summoner` interface guarantees that an `ArcaneEntity` will be produced, but leaves the precise spectral signature to the concrete `PhantomSummoner` or `SpriteSummoner`.
