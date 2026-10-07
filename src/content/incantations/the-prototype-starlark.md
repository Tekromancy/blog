---
title: The Prototype
description: Cloning immutable artifacts for rapid divergence.
type: starlark
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  def clone_artifact(artifact, **overrides):
      # Extract all fields from the base struct
      fields = {k: getattr(artifact, k) for k in dir(artifact) if not k.startswith("_")}
      # Apply any overrides or mutations
      fields.update(overrides)
      return struct(**fields)
  
  # Usage
  base_drone = struct(speed=100, armor=50, ai="basic")
  assault_drone = clone_artifact(base_drone, armor=150, weapons=["plasma_cannon"])
tags: [creational, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Starlark enforces strict immutability. Once a `struct` is forged, it cannot be altered. The **Prototype** pattern in Starlark serves as a magical duplicator, allowing mages to extract the ethereal essence (fields) of an existing artifact, inject modifications, and coalesce them into a completely new, immutable entity. This is an essential technique for creating variations of complex build configurations without massive code duplication.
