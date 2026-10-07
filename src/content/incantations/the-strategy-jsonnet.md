---
title: The Strategy of Jsonnet
description: Encapsulating interchangeable algorithms.
type: jsonnet
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactic Swapping"
formula: |2
  local AuthStrategies = {
    basic: function(req) req + { auth_type: "basic", header: "Basic xyz" },
    oauth2: function(req) req + { auth_type: "oauth2", token: "Bearer abc" }
  };

  local RequestFactory(strategyName, req) =
    AuthStrategies[strategyName](req);

  {
    reqA: RequestFactory("basic", { url: "/api" }),
    reqB: RequestFactory("oauth2", { url: "/secure" })
  }
tags: [behavioral, strategy, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Different calculation algorithms or augmentation logic can be mapped in a dictionary, letting the invoker seamlessly switch tactical maneuvers by name.
