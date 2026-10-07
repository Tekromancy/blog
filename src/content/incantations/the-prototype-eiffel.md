---
title: "The Prototype Cloning Spell"
description: "Creating exact duplicates of arcane constructs."
type: eiffel
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Cloning"
formula: |2
  deferred class
      ARCANE_CLONEABLE

  feature -- Duplication

      duplicate: ARCANE_CLONEABLE
          deferred
          ensure
              is_clone: Result /= Current
              is_identical: Result.is_equal(Current)
          end

  end
tags: [creational, prototype, cloning, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using deep and shallow cloning pacts, the Prototype pattern allows magi to instantly replicate existing magical phenomena without repeating the expensive creation rituals.
