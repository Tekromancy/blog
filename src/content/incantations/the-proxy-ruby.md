---
title: The Proxy
description: "A treacherous familiar that acts as a gatekeeper, demanding a toll of blood before granting access to the Forbidden Grimoire."
type: ruby
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Warding
formula: |
  class ForbiddenGrimoire
    def read_secret
      "The true name of the Archdemon is revealed!"
    end
  end

  class GrimoireProxy
    def initialize(caster_blood_level)
      @blood_level = caster_blood_level
      @grimoire = nil
    end

    def read_secret
      if @blood_level >= 50
        @blood_level -= 50
        @grimoire ||= ForbiddenGrimoire.new
        @grimoire.read_secret
      else
        "Access Denied: Insufficient blood tribute."
      end
    end
  end

  # Usage:
  # proxy = GrimoireProxy.new(100)
  # proxy.read_secret # succeed, costs 50
  # proxy.read_secret # succeed, costs 50
  # proxy.read_secret # fails, out of blood
tags: [ruby, design-pattern, proxy, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy provides a surrogate or placeholder for another object to control access to it. This familiar ensures that only a hemomancer who has paid the requisite blood toll is allowed to instantiate and interact with the dangerous `ForbiddenGrimoire`.
