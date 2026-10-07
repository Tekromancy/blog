---
title: The Flyweight of Jsonnet
description: Sharing common state to reduce memory footprint.
type: jsonnet
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Essence Sharing"
formula: |2
  local SharedLabels = {
    environment: "production",
    managed_by: "jsonnet-sorcery"
  };

  local Service(name) = {
    name: name,
    labels: SharedLabels
  };

  {
    srv1: Service("auth"),
    srv2: Service("billing")
  }
tags: [structural, flyweight, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By capturing common data in a shared local variable, Jsonnet implements the Flyweight pattern, reusing the exact same data reference across multiple objects to keep the arcane footprint minimal.
