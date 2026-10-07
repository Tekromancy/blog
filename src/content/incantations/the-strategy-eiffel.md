---
title: "The Strategy Grimoire"
description: "Dynamically swapping algorithms of destruction."
type: eiffel
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical"
formula: |2
  deferred class
      COMBAT_STRATEGY

  feature
      execute_tactics
          deferred
          end
  end

  class
      WAR_MAGE

  feature
      tactic: COMBAT_STRATEGY

      set_tactic (t: COMBAT_STRATEGY)
          require
              valid_tactic: t /= Void
          do
              tactic := t
          ensure
              tactic_set: tactic = t
          end

      fight
          do
              tactic.execute_tactics
          end
  end
tags: [behavioral, strategy, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By utilizing a Strategy, a War Mage can dynamically consult their Grimoire mid-battle, seamlessly switching from fiery bombardment to frost weaving.
