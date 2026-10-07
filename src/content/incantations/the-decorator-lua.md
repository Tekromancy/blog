---
title: "The Decorator of Luminous Glamours"
description: "Wrapping a core spell with layers of protective and luminous enchantments."
type: lua
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Illusion // Glamour
formula: |
  local BasicSpell = { cast = function() return "A spark of magic" end }

  local function LunarGlamour(spell)
    return {
      cast = function()
        return spell.cast() .. " bathed in moonlight."
      end
    }
  end

  local function StarlightGlamour(spell)
    return {
      cast = function()
        return spell.cast() .. " glittering with stars."
      end
    }
  end

  local mySpell = StarlightGlamour(LunarGlamour(BasicSpell))
  print(mySpell.cast())
tags: [fae, decorator, wrapper]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Decorator

Through the application of Fae Moon Glyphs, a simple spark of magic can be draped in endless glamours. The Decorator pattern in Lua often utilizes closures and lightweight table wrappers, layering symbiotic magic without altering the core spell's true nature.
