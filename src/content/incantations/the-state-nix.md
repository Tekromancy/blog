---
title: "The State Hex"
description: "Transitioning behaviors based on pure state progression."
type: nix
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # State Handlers
    states = {
      dormant = {
        cast = "Fizzle...";
        next = "active";
      };
      active = {
        cast = "Arcane Explosion!";
        next = "exhausted";
      };
      exhausted = {
        cast = "Not enough mana.";
        next = "dormant";
      };
    };

    # Context
    mkWand = stateName: {
      inherit stateName;
      castSpell = states.''${stateName}.cast;
      recharge = mkWand states.''${stateName}.next;
    };

    wand1 = mkWand "dormant";
    wand2 = wand1.recharge;
    wand3 = wand2.recharge;
  in
  [ wand1.castSpell wand2.castSpell wand3.castSpell ]
tags: [behavioral, state, nix, finite-state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern allows an object to alter its behavior when its internal state changes. In Nix, instead of mutating variables, state transitions return entirely new "wand" entities, forming a pure Finite State Machine (FSM).
