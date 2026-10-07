---
title: "The Decorator Rune"
description: "Dynamically attaching new properties to spells."
type: eiffel
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  deferred class
      SPELL_COMPONENT

  feature
      mana_cost: INTEGER
          deferred
          end
  end

  deferred class
      SPELL_DECORATOR

  inherit
      SPELL_COMPONENT

  feature {NONE}
      base_spell: SPELL_COMPONENT

  feature
      mana_cost: INTEGER
          do
              Result := base_spell.mana_cost + added_cost
          end

      added_cost: INTEGER
          deferred
          end
  end
tags: [structural, decorator, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Decorators allow a spell to be amplified with metamagic runes, strictly adhering to the original spell's interface while augmenting its behavior.
