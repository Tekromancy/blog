---
title: "The Strategy Incantation in Carbon"
description: "Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime."
type: carbon
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Algorithmics"
formula: |2
  package Strategy api;

  interface RoutingStrategy {
    fn CalculatePath[me: Self](start: String, end: String) -> String;
  }

  class StealthRoute {
    impl as RoutingStrategy {
      fn CalculatePath[me: Self](start: String, end: String) -> String {
        return "Stealth path from " + start + " to " + end;
      }
    }
  }

  class AggressiveRoute {
    impl as RoutingStrategy {
      fn CalculatePath[me: Self](start: String, end: String) -> String {
        return "Direct heavy assault from " + start + " to " + end;
      }
    }
  }

  class Navigator {
    var strategy: RoutingStrategy*;

    fn SetStrategy[addr me: Self*>(s: RoutingStrategy*) {
      (*me).strategy = s;
    }

    fn Navigate[me: Self](start: String, end: String) -> String {
      return (*me.strategy).CalculatePath(start, end);
    }
  }
tags: [behavioral, carbon, algorithms, swapping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Strategy: Dynamic Algorithmic Swapping

During a live run through the matrix, the optimal path changes in milliseconds. Hardcoding routing algorithms into the `Navigator` creates bloated, inflexible code. The Strategy pattern extracts the algorithm.

Carbon thrives on interfaces. By defining a `RoutingStrategy`, the `Navigator` simply holds a pointer to the current approach. Whether the cyber-runner needs a `StealthRoute` or an `AggressiveRoute`, the Strategy can be swapped seamlessly, adhering to the Successor Pact's mandate for modularity and runtime flexibility.
