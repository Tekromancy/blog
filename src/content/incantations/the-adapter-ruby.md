---
title: The Adapter
description: "A dark cipher that morphs incompatible ancient incantations into modern, viable hemomancy rituals."
type: ruby
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Linguistics
formula: |
  class ModernRitual
    def cast_blood_spell(liters_of_blood)
      "Casting spell with #{liters_of_blood} liters of vitae."
    end
  end

  class AncientScroll
    def invoke_sacrificial_rite(drams_of_ichor, chant)
      "Chanting '#{chant}' while burning #{drams_of_ichor} drams of ichor."
    end
  end

  class ScrollAdapter < ModernRitual
    def initialize(ancient_scroll)
      @ancient_scroll = ancient_scroll
    end

    def cast_blood_spell(liters_of_blood)
      # 1 liter is roughly 270 drams
      drams = liters_of_blood * 270
      @ancient_scroll.invoke_sacrificial_rite(drams, "Sanguis Vita Est")
    end
  end
tags: [ruby, design-pattern, adapter, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter translates the lost dialects of ancient scrolls into the standardized API of a Modern Ritual. By wrapping the old class in a new interface, the modern spellcaster can invoke ancient powers without rewriting the original scrolls.
