---
title: The Facade
description: "A dark altar that conceals the maddening complexity of the underworld's soul-harvesting bureaucracy."
type: ruby
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Veiling"
formula: |2
  class SoulHarvester
    def extract_soul(victim)
      "Extracting soul from #{victim}."
    end
  end

  class BloodSacrifice
    def spill_blood(liters)
      "Spilling #{liters} liters of blood."
    end
  end

  class DemonicContract
    def forge_pact(soul, blood_amount)
      "Forging a pact bounded by #{blood_amount} liters for the soul."
    end
  end

  class AltarOfDoomFacade
    def initialize
      @harvester = SoulHarvester.new
      @sacrifice = BloodSacrifice.new
      @contract = DemonicContract.new
    end

    def perform_grand_ritual(victim_name)
      result = []
      result << @sacrifice.spill_blood(5)
      result << @harvester.extract_soul(victim_name)
      result << @contract.forge_pact(victim_name, 5)
      result.join("\n")
    end
  end
tags: [ruby, design-pattern, facade, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Facade provides a simple, unified interface to a complex subsystem. Instead of an adept fumbling through the perilous steps of soul extraction, blood spilling, and contract binding, the `AltarOfDoomFacade` executes the grand ritual with a single command, shielding the caster from fatal missteps.
