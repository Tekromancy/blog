---
title: "The Command of the Sealed Scroll"
description: "Encapsulating a spell as an object to be stored, passed, and executed at will."
type: lua
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Scrolls"
formula: |2
  local function CommandScroll(action, target)
    return {
      execute = function()
        action(target)
      end
    }
  end

  local function castFireball(target)
    print("A fiery explosion strikes " .. target .. "!")
  end

  local scroll = CommandScroll(castFireball, "the Goblin")
  -- Store for later
  scroll.execute()
tags: [fae, command, execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Command

Through the magic of Lua closures, the Command pattern binds an action and its targets into a single Sealed Scroll. This symbiotic script can be handed to the host engine, queued, delayed, or reversed, executing its Fae Moon Glyphs only when the time is right.
