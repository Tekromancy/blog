---
title: The Factory Method of Apparitions
description: Delegate the instantiation of tag-wards to subclasses of the arcane arts.
type: coldfusion
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  interface name="ISummoner" {
      public IApparition summon();
  }

  component name="DemonSummoner" implements="ISummoner" {
      public IApparition function summon() {
          return new DemonApparition();
      }
  }

  component name="AngelSummoner" implements="ISummoner" {
      public IApparition function summon() {
          return new AngelApparition();
      }
  }
tags: [factory-method, coldfusion, summoning, instantiation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method establishes an interface for creating objects, but lets subclasses decide which class to instantiate. The master Adobe Alchemist defines the core invocation pattern, while apprentice mages specify the precise spirit to pull from the ether.
