---
title: "The Bridge of Spheres"
description: "Decoupling abstraction of spells from their elemental implementation."
type: eiffel
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Dimensional"
formula: |2
  class
      SPELL_ABSTRACTION

  create
      make

  feature {NONE} -- Initialization

      make (imp: ELEMENTAL_IMPLEMENTOR)
          require
              imp_exists: imp /= Void
          do
              implementor := imp
          end

  feature -- Execution

      cast_spell
          do
              implementor.ignite_mana
              implementor.channel_force
          end

  feature {NONE} -- Internal

      implementor: ELEMENTAL_IMPLEMENTOR

  end
tags: [structural, bridge, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By establishing a Bridge, a mage can swap out the elemental core of a spell without changing the fundamental incantation structure.
