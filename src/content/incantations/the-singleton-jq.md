---
title: The Singleton (jq)
description: Enforce a monolithic state configuration across the entire transformation pipeline.
type: jq
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Sealing"
formula: |2
  # Define the singular state as a zero-arity function (constant)
  def nexus_config:
    { "grid_id": "OMEGA", "encryption": "aes-256-gcm", "version": "9.9.9" };

  # Any node in the stream can call upon the nexus
  .data[] | . + { "stamped_by": nexus_config.grid_id }
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In functional paradigms like `jq`, the concept of a "mutable" singleton is a heresy against the stream. Instead, we conjure the **Singleton** as a ubiquitous zero-arity function—an eternal constant. By sealing the configuration in this manner, every node and filter throughout your pipeline draws from the exact same truth.
