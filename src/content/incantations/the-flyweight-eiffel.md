---
title: "The Flyweight Illusion"
description: "Sharing arcane states to render massive phantom armies."
type: eiffel
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Phantasm"
formula: |2
  class
      PHANTOM_FLYWEIGHT

  feature -- State
      intrinsic_aura: STRING

      manifest (extrinsic_coords: TUPLE[x: INTEGER; y: INTEGER])
          do
              -- Render phantom at coords using intrinsic_aura
          end
  end

  class
      PHANTOM_FACTORY

  feature -- Factory
      get_phantom (aura: STRING): PHANTOM_FLYWEIGHT
          -- Return cached phantom or create new
          deferred
          ensure
              Result /= Void
          end
  end
tags: [structural, flyweight, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
By stripping extrinsic state from illusions, a master of the Flyweight pattern can project a legion using the mana of a single soldier.
