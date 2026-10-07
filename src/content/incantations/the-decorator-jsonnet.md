---
title: The Decorator of Jsonnet
description: Adding behavior to objects dynamically via mixins.
type: jsonnet
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Aura Enhancement"
formula: |2
  local BaseService = {
    port: 8080,
    protocol: "http"
  };

  local WithMetrics = {
    metrics_enabled: true,
    metrics_port: 9090
  };

  local WithLogging = {
    logging_level: "debug"
  };

  {
    service: BaseService + WithMetrics + WithLogging
  }
tags: [structural, decorator, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using Jsonnet's mixin capabilities (`+`), the Decorator pattern enhances base configurations with supplementary traits seamlessly, creating a robust artifact.
