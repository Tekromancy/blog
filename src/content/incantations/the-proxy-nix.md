---
title: "The Proxy Hex"
description: "Controlling access or intercepting evaluation of derivations."
type: nix
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Pure Environment Hexes"
formula: |2
  let
    # The real subject, an expensive evaluation
    expensiveSpell = {
      data = builtins.trace "Evaluating Expensive Spell..." "Ultimate Destruction";
    };

    # The Proxy controls access, perhaps adding authorization or caching
    spellProxy = user:
      if user == "Archmage" then
        expensiveSpell.data
      else
        "Access Denied: You lack the clearance.";
  in
  {
    apprenticeAttempt = spellProxy "Apprentice";
    archmageAttempt = spellProxy "Archmage";
  }
tags: [structural, proxy, nix, control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy intercepts requests to the real subject. In Nix, thanks to lazy evaluation, the `expensiveSpell` is never actually evaluated if the Proxy denies access, serving as both a security ward and a performance optimization.
