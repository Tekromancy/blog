---
title: The Factory Method
description: "A foundational blood pact that defers the exact manifestation of summoned entities to the caster's chosen lineage."
type: ruby
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Bloodmancy"
formula: |2
  class SummoningCircle
    def invoke_entity
      raise NotImplementedError, "Subclasses must implement the invocation ritual"
    end

    def commence_ritual
      entity = invoke_entity
      "The ritual begins: #{entity.manifest}"
    end
  end

  class CrimsonCircle < SummoningCircle
    def invoke_entity
      BloodFiend.new
    end
  end

  class VoidCircle < SummoningCircle
    def invoke_entity
      VoidStalker.new
    end
  end

  class Entity
    def manifest; raise NotImplementedError; end
  end

  class BloodFiend < Entity
    def manifest; "A beast of pure vitae materializes!"; end
  end

  class VoidStalker < Entity
    def manifest; "A shadow detaches itself from the darkness."; end
  end
tags: [ruby, design-pattern, factory-method, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method defines an interface for summoning but allows subclasses (the specific esoteric circles) to alter the type of entities that manifest. The base ritual remains consistent, dynamically weaving the precise arcane threads provided by the invoking lineage.
