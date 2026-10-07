---
title: The Command Ward
description: Encapsulating arcane decrees.
type: pony
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Compulsion"
formula: |2
  trait val Command
    fun execute(target: Target ref)

  class val SmiteCommand is Command
    fun execute(target: Target ref) => target.damage(50)
tags: [pony, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Command Ward

Commands formulated as `val` objects can be queued up, sent across actor boundaries, and safely executed later.
