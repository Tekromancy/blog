---
title: Abstract Factory in ReasonML
description: A functional factory of factories for web hexes.
type: reason
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Pact-Making"
formula: |2
  module type WidgetFactory = {
    type button;
    type window;
    let createButton: unit => button;
    let createWindow: unit => window;
  };
  module MacFactory: WidgetFactory = {
    type button = string;
    type window = string;
    let createButton = () => "MacButton Rune";
    let createWindow = () => "MacWindow Hex";
  };
tags: [reason, factory, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory seals a functional pact, ensuring that the conjured UI hexes remain bound to their specific aesthetic dimensions.
