---
title: Mediator in ReasonML
description: Centralizing events in a dispatch hub.
type: reason
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Charm"
formula: |2
  type message = Chat(string) | Alert(string);
  let broker = (msg) =>
    switch (msg) {
    | Chat(s) => Js.log("Broadcast: " ++ s)
    | Alert(s) => Js.log("WARNING: " ++ s)
    };
tags: [reason, mediator, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A single dispatcher function receives variants and routes the flows of logic, preventing the UI nodes from entangling their communication lines.
