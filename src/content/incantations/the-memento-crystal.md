---
title: "The Memento: The Chrono-Anchor"
description: "Capturing and externalizing an object's internal state so that the object can be restored to this state later."
type: "crystal"
gofPattern: "Memento"
gofCategory: "Behavioral"
arcaneSchool: "Chronos // Time Weaving"
formula: |2
  class ChronoAnchor
    getter state : String
    def initialize(@state : String)
    end
  end

  class Timeline
    property state : String = "Peaceful"

    def cast_spell(event : String)
      @state = event
      puts "Timeline shifted to: #{@state}"
    end

    def save_state : ChronoAnchor
      puts "Anchoring time at: #{@state}"
      ChronoAnchor.new(@state)
    end

    def restore_state(anchor : ChronoAnchor)
      @state = anchor.state
      puts "Reverted time back to: #{@state}"
    end
  end

  class TimeKeeper
    property anchors = [] of ChronoAnchor
  end

  timeline = Timeline.new
  keeper = TimeKeeper.new

  keeper.anchors << timeline.save_state

  timeline.cast_spell("Demonic Invasion")
  keeper.anchors << timeline.save_state

  timeline.cast_spell("Apocalypse")

  puts ">> Things went wrong. Rewinding..."
  # Restore to the first anchor
  timeline.restore_state(keeper.anchors.first)
tags: ["behavioral", "memento", "crystal", "chrono-anchor"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When weaving volatile timelines, a Chrono-Anchor saves the intrinsic state of reality. The TimeKeeper holds these sealed mementos, completely ignorant of their contents, ready to slam the universe back into place when a demonic invasion inevitably occurs.
