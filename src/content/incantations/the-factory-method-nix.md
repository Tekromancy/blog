---
title: "The Factory Method Hex"
description: "A method to dynamically weave derivations based on type signatures."
type: nix
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Pure Environment Hexes"
formula: |2
  { lib ? import <nixpkgs/lib> }:

  let
    # The Factory Method
    createHex = hexType:
      if hexType == "bind" then { type = "bind"; effect = "Restricts movement."; energy = 10; }
      else if hexType == "banish" then { type = "banish"; effect = "Sends entity to the Void."; energy = 50; }
      else throw "Unknown hex type: ''${hexType}";

    # Invocations
    lesserBinding = createHex "bind";
    abyssalBanishment = createHex "banish";
  in
  {
    inherit lesserBinding abyssalBanishment;
  }
tags: [creational, factory-method, nix, parameters]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method provides an abstraction layer over raw attribute set creation. By parameterizing the instantiation, the archmage delegates the exact specification of the hex to the method, simplifying the calling code and enforcing structural consistency.
