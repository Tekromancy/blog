---
title: The Facade of Jsonnet
description: A simplified interface to a complex configuration subsystem.
type: jsonnet
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Veil of Simplicity"
formula: |2
  local ComplexNetwork = { ... };
  local ComplexCompute = { ... };
  local ComplexStorage = { ... };

  local EasyDeployFacade(name, size) = {
    network: { vpc: "default" },
    compute: { instances: if size == "large" then 10 else 1 },
    storage: { volume_gb: if size == "large" then 1000 else 10 },
    app_name: name
  };

  {
    myApp: EasyDeployFacade("ArcaneService", "small")
  }
tags: [structural, facade, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Facade hides the labyrinth of complex system parameters behind a simple function, providing an intuitive sigil to cast deployment spells.
