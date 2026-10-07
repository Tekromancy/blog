---
title: "The Bridge Incantation in Carbon"
description: "Decouple an abstraction from its implementation so the two can vary independently across the grid."
type: carbon
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Enchantment // Binding"
formula: |2
  package Bridge api;

  // Implementor
  interface RenderEngine {
    fn Draw[me: Self](shape: String) -> String;
  }

  class NeonRenderer {
    impl as RenderEngine {
      fn Draw[me: Self](shape: String) -> String {
        return "Drawing a neon " + shape;
      }
    }
  }

  class HologramRenderer {
    impl as RenderEngine {
      fn Draw[me: Self](shape: String) -> String {
        return "Projecting a hologram of " + shape;
      }
    }
  }

  // Abstraction
  class Construct {
    var engine: RenderEngine*;

    fn Render[me: Self]() -> String {
      return (*me.engine).Draw("Construct");
    }
  }

  class CyberCube extends Construct {
    // In Carbon, inheritance/struct composition would allow overriding behavior
    fn Render[me: Self]() -> String {
      return (*me.engine).Draw("CyberCube");
    }
  }
tags: [structural, carbon, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge: The Decoupled Matrices

As constructs grow complex, tying their logical form (the Abstraction) directly to their physical rendering (the Implementation) results in an explosive matrix of subclasses. The Bridge pattern severs this monolithic bond.

By giving a `Construct` a pointer to a `RenderEngine` interface, Carbon allows you to bind any rendering logic (Neon, Hologram, Plasma) to any shape (Cube, Sphere, Pyramid) dynamically. The Successor Pact favors composition and interfaces over deep, brittle inheritance trees.
