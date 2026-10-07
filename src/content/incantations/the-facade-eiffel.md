---
title: "The Facade Monolith"
description: "A single, simple sigil abstracting a massive library of rituals."
type: eiffel
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Sealing"
formula: |2
  class
      RITUAL_FACADE

  create
      make

  feature {NONE} -- Internal
      ley_lines: LEY_LINE_SUBSYSTEM
      mana_pool: MANA_POOL_SUBSYSTEM
      warding: WARDING_SUBSYSTEM

      make
          do
              create ley_lines
              create mana_pool
              create warding
          end

  feature -- Interface

      execute_grand_seal
          do
              mana_pool.drain_reserve
              ley_lines.align
              warding.deploy_shields
          ensure
              warding.is_active
          end
  end
tags: [structural, facade, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Facade hides the chaotic interactions of multiple subsystems behind a simple, easily invoked grand spell.
