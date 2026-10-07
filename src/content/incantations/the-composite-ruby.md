---
title: The Composite
description: "A unified hive mind of parasitic blood-thralls, where the master commands an army exactly as they command a single thrall."
type: ruby
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Necromancy // Swarm"
formula: |2
  class HiveEntity
    def drain_life
      raise NotImplementedError
    end
  end

  class BloodThrall < HiveEntity
    def initialize(name)
      @name = name
    end

    def drain_life
      "#{@name} siphons a drop of blood."
    end
  end

  class ThrallSwarm < HiveEntity
    def initialize(name)
      @name = name
      @members = []
    end

    def add(entity)
      @members << entity
    end

    def remove(entity)
      @members.delete(entity)
    end

    def drain_life
      results = @members.map(&:drain_life)
      "The swarm '#{@name}' attacks:\n" + results.join("\n")
    end
  end
tags: [ruby, design-pattern, composite, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite pattern models tree structures of objects. A single `BloodThrall` and a massive `ThrallSwarm` both respond to the `drain_life` invocation. The master hemomancer does not need to distinguish between a lone servant and a terrifying horde.
