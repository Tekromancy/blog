---
title: "The Chain of Responsibility Hex"
description: "Passing requests through a chain of pure handlers."
type: nix
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # A handler takes a request and the next handler in the chain
    mkHandler = condition: processFn: next: request:
      if condition request then
        processFn request
      else if next != null then
        next request
      else
        "Unhandled request: ''${request.type}";

    # Concrete handlers
    authHandler = mkHandler 
      (req: req.type == "auth") 
      (req: "Authenticating ''${req.user}...");
    
    buildHandler = mkHandler 
      (req: req.type == "build") 
      (req: "Building derivation ''${req.target}...");

    # Assemble the chain
    chain = authHandler (buildHandler null);
  in
  [
    (chain { type = "build"; target = "nginx"; })
    (chain { type = "auth"; user = "thoth"; })
    (chain { type = "unknown"; })
  ]
tags: [behavioral, chain-of-responsibility, nix, pipelines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility is implemented via higher-order functions. Each handler decides to either process the request or pass it down the chain. This avoids monolithic conditional structures and promotes pure composition.
