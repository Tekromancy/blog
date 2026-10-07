---
title: The Bridge
description: "Decoupling the magical vessel from the corrupted essence it contains, allowing both to mutate independently."
type: ruby
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Vesselcraft"
formula: |2
  # The Implementation
  class MagicEssence
    def manifest_power
      raise NotImplementedError
    end
  end

  class BloodEssence < MagicEssence
    def manifest_power; "vitality drain"; end
  end

  class ShadowEssence < MagicEssence
    def manifest_power; "obscuring darkness"; end
  end

  # The Abstraction
  class ArcaneVessel
    def initialize(essence)
      @essence = essence
    end

    def activate
      raise NotImplementedError
    end
  end

  class Amulet < ArcaneVessel
    def activate
      "The amulet pulses with #{@essence.manifest_power}."
    end
  end

  class Chalice < ArcaneVessel
    def activate
      "The chalice overflows, spreading #{@essence.manifest_power}."
    end
  end
tags: [ruby, design-pattern, bridge, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge separates the physical artifact (the Abstraction) from the magical energy it holds (the Implementation). A hemomancer can craft a Chalice or Amulet, and independently infuse it with Blood or Shadow essence, preventing an exponential explosion of classes like `BloodAmulet` or `ShadowChalice`.
