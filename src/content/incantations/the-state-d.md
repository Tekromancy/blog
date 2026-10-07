---
title: State
description: Allow an elemental entity to completely change its behavior as its internal energy transitions from solid to plasma.
type: d
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  interface ElementalState { void react(); }

  class FrozenState : ElementalState { override void react() {} }
  class PlasmaState : ElementalState { override void react() {} }

  class Elemental {
      private ElementalState state;
      void setState(ElementalState s) { state = s; }
      void react() { state.react(); }
  }
tags: [behavioral, state, dlang, finite-state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Dynamic rebinding of core behaviors based on volatile internal states.
