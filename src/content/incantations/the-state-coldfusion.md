---
title: The State of the Lycanthrope
description: Allow an apparition to alter its behavior when its internal state changes, appearing to change its class.
type: coldfusion
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shapeshifting"
formula: |2
  interface name="IMoonPhase" {
      public void act();
  }

  component name="HumanForm" implements="IMoonPhase" {
      public void function act() { writeOutput("Speaks normally."); }
  }

  component name="WolfForm" implements="IMoonPhase" {
      public void function act() { writeOutput("Howls at the moon!"); }
  }

  component name="Lycanthrope" {
      variables.currentState = new HumanForm();

      public void function setPhase(IMoonPhase phase) {
          variables.currentState = arguments.phase;
      }

      public void function performAction() {
          variables.currentState.act();
      }
  }
tags: [state, coldfusion, shapeshifting, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Lycanthrope's internal logic is not a mess of `if/else` checks against the moon's phase. Instead, it delegates its behavior to a state object. As the environment shifts, the alchemist swaps the internal tag-ward, and the entity instantly transfigures from man to beast.
