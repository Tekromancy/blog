---
title: State in ReasonML
description: Finite state machines mapped to variants.
type: reason
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  type state = Idle | Running(int) | Finished;

  let step = (s) =>
    switch (s) {
    | Idle => Running(0)
    | Running(5) => Finished
    | Running(n) => Running(n + 1)
    | Finished => Finished
    };
tags: [reason, state, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Rather than polymorphic objects representing states, Reason uses exhaustive ADTs. The compiler guarantees that no phantom state can ever be reached.
