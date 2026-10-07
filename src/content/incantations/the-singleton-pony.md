---
title: The Singleton Ward
description: Centralized, globally unique actors.
type: pony
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Locus of Control"
formula: |2
  actor SingletonNexus
    var _count: U32 = 0
    be increment() => _count = _count + 1
tags: [pony, singleton, actor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Singleton Ward

True singletons in the traditional sense are hazardous. In Pony, a single actor instance acts as a synchronized nexus, processing messages sequentially and avoiding state corruption.
