---
title: "The Facade: The Ritual Master"
description: "Providing a unified interface to a set of interfaces in a subsystem."
type: "crystal"
gofPattern: "Facade"
gofCategory: "Structural"
arcaneSchool: "Abjuration // Simplification"
formula: |2
  class IncenseBurner
    def ignite
      puts "Incense ignited. The air fills with smoke."
    end
  end

  class ChalkDrawer
    def draw_circle
      puts "A glowing pentagram is drawn on the floor."
    end
  end

  class DemonSummoner
    def call_forth
      puts "A minor imp steps through the veil."
    end
  end

  class RitualFacade
    @burner = IncenseBurner.new
    @drawer = ChalkDrawer.new
    @summoner = DemonSummoner.new

    def perform_summoning
      puts "--- Beginning Ritual ---"
      @burner.ignite
      @drawer.draw_circle
      @summoner.call_forth
      puts "--- Ritual Complete ---"
    end
  end

  master = RitualFacade.new
  master.perform_summoning
tags: ["structural", "facade", "crystal", "ritual"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The inner workings of high magic are dangerous and complex. The Facade provides a single, simple incantation—a Ritual Master—who orchestrates the chaotic subsystems of burning, drawing, and summoning behind a protective veil.
