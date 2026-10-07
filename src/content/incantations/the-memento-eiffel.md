---
title: "The Memento Chronosphere"
description: "Capturing and restoring the state of a localized temporal field."
type: eiffel
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time-Weaving"
formula: |2
  class
      TIME_MEMENTO

  feature {CHRONOMANCER}
      state: STRING

      make (s: STRING)
          do
              state := s
          end
  end

  class
      CHRONOMANCER

  feature
      current_state: STRING

      save_time: TIME_MEMENTO
          do
              create Result.make (current_state)
          end

      restore_time (m: TIME_MEMENTO)
          do
              current_state := m.state
          end
  end
tags: [behavioral, memento, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A Memento safely encapsulates the state of the timestream, ensuring a chronomancer can revert to a prior state without exposing its internal temporal gears.
