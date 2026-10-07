---
title: The Factory Method
description: Defer the instantiation of extraterrestrial probes to crystalline subclasses.
type: apl
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Probe-Spawning"
formula: |2
  :Class AlienProbeSpawner
      ∇ R←SpawnProbe
        :Access Public Shared
        ⍝ Override in subclasses
        R←'Generic Probe ⍰'
      ∇

      ∇ R←Deploy
        :Access Public
        R←'Deploying: ', SpawnProbe
      ∇
  :EndClass

  :Class AlphaCentauriSpawner : AlienProbeSpawner
      ∇ R←SpawnProbe
        :Access Public Shared
        R←'Silicate Probe ⌹'
      ∇
  :EndClass

  :Class SiriusSpawner : AlienProbeSpawner
      ∇ R←SpawnProbe
        :Access Public Shared
        R←'Plasma Probe ⌾'
      ∇
  :EndClass
tags: [apl, creational, alien, factory-method, probes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the ancient star-spawners need to deploy probes across the cosmic void, they utilize the Factory Method. The base spawner defines the deployment ritual (`Deploy`), but delegates the exact manifestation of the probe (`SpawnProbe`) to the specific star-system spawner. `⌹` and `⌾` represent the silicates and plasmas woven by the localized alien geometries.
