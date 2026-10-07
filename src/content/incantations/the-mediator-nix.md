---
title: "The Mediator Hex"
description: "Centralizing configuration overrides to prevent chaotic dependencies."
type: nix
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # Mediator: Central configuration overlay
    mkSystem = overrides:
      let
        defaultNetwork = { port = 80; firewall = true; };
        defaultDb = { port = 5432; allowNetwork = false; };
        
        # The Mediator coordinates the configuration between network and db
        finalConfig = {
          network = defaultNetwork // overrides.network or {};
          db = defaultDb // overrides.db or {};
        };
        
        # Cross-component coordination via the mediator
        coordinatedDb = finalConfig.db // {
          allowNetwork = finalConfig.network.firewall;
        };
      in
      { network = finalConfig.network; db = coordinatedDb; };

  in
  mkSystem { network = { firewall = false; }; }
tags: [behavioral, mediator, nix, coordination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator pattern restricts direct communications between components, forcing them to collaborate only via a mediator object. In NixOS module systems, the module evaluation engine itself acts as a massive Mediator, resolving cross-dependencies through `config` and `options`.
