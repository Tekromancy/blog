---
title: "The Observer Hex"
description: "Reacting functionally to changes in central configuration."
type: nix
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # Subject: A central configuration that triggers observers
    config = { debug = true; target = "x86_64-linux"; };

    # Observers (Functions reacting to the subject's state)
    loggerObserver = cfg:
      if cfg.debug then "Logging Enabled" else "Logging Disabled";
      
    compilerObserver = cfg:
      "Compiling for ''${cfg.target}";

    # Notifier (Applying observers to the subject)
    notify = subject: observers:
      map (obs: obs subject) observers;
  in
  notify config [ loggerObserver compilerObserver ]
tags: [behavioral, observer, nix, reactivity]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In an immutable context, the Observer pattern translates to mapping functions over a state object. The subject does not actively push updates in real-time, but rather, observers are applied to the finalized configuration to yield the reactive derivations.
