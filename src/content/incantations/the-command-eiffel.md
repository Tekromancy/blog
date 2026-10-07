---
title: "The Command Scroll"
description: "Encapsulating a spell invocation as an object."
type: eiffel
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  deferred class
      SPELL_COMMAND

  feature
      execute
          deferred
          end

      undo
          deferred
          end
  end

  class
      FIREBALL_COMMAND

  inherit
      SPELL_COMMAND

  feature
      execute
          do
              -- ignite target
          end

      undo
          do
              -- extinguish and heal
          end
  end
tags: [behavioral, command, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A Command turns a spell into a tangible scroll, allowing it to be queued, delayed, or reversed (undone) dynamically.
