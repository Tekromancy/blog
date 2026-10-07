---
title: The Mediator of Jsonnet
description: Centralizing complex communications between objects.
type: jsonnet
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus Control"
formula: |2
  local Mediator(config) = {
    db_url: "db://" + config.db.host + ":" + std.toString(config.db.port),
    api_endpoint: "http://" + config.api.host + "/v1"
  };

  local DBConfig = { host: "db-server", port: 5432 };
  local APIConfig = { host: "api-server" };

  {
    system_links: Mediator({ db: DBConfig, api: APIConfig })
  }
tags: [behavioral, mediator, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Mediator centralizes the relationships between distinct configuration fragments, weaving them into a cohesive environment without them directly coupling.
