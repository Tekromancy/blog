---
title: The Spawning Sigil (Factory Method)
description: Deferring the creation of specialized sed outputs to distinct branches.
type: sed
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Factory Method: Delegating string creation to specific labels
  /CREATE:ERROR/ b error_factory
  /CREATE:INFO/ b info_factory
  b
  
  :error_factory
  s/.*/[ERROR] Spawned by error factory/
  p
  d
  
  :info_factory
  s/.*/[INFO] Spawned by info factory/
  p
  d
tags: [sed, creational, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
