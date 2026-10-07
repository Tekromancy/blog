---
title: The Prototype of Jsonnet
description: Cloning and overriding configurations by inheritance.
type: jsonnet
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  local BaseConfig = {
    timeout: 30,
    retries: 3,
    debug: false
  };

  local ProdConfig = BaseConfig {
    retries: 5
  };

  local DevConfig = BaseConfig {
    debug: true,
    timeout: 120
  };

  {
    prod: ProdConfig,
    dev: DevConfig
  }
tags: [creational, prototype, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In Jsonnet, the Prototype pattern is a native spell. Every object can act as a prototype, and extending it via `+` or `{}` creates a cloned construct with its own unique traits.
