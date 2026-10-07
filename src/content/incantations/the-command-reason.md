---
title: Command in ReasonML
description: Reifying actions as variant payloads.
type: reason
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Channeling"
formula: |2
  type command = 
    | Move(int, int)
    | Attack(string);

  let execute = (cmd) =>
    switch (cmd) {
    | Move(x, y) => Js.log2("Moving to", (x, y))
    | Attack(target) => Js.log2("Attacking", target)
    };
tags: [reason, command, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Facebook Functional Pacts represent commands not as objects, but as algebraic data types, enabling powerful replay and undo mechanics.
