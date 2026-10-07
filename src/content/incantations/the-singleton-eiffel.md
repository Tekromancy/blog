---
title: "The Singleton Nexus"
description: "A unique focal point of magical power."
type: eiffel
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Evocation // Leylines"
formula: |2
  class
      MANA_NEXUS

  create {NONE}
      make

  feature {NONE} -- Initialization

      make
          do
              power_level := 100
          end

  feature -- Access

      instance: MANA_NEXUS
          once
              create Result.make
          ensure
              nexus_exists: Result /= Void
          end

      power_level: INTEGER

  end
tags: [creational, singleton, eiffel, once]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Eiffel's `once` routines make the Singleton naturally robust, providing a guaranteed single locus of power.
