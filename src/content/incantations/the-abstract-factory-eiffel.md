---
title: "The Abstract Factory Ward"
description: "Forging interconnected wards through a common interface pact."
type: eiffel
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Pact-making"
formula: |2
  deferred class
      ABSTRACT_WARD_FACTORY

  feature -- Factory

      create_offensive_ward: OFFENSIVE_WARD
          deferred
          ensure
              ward_forged: Result /= Void
          end

      create_defensive_ward: DEFENSIVE_WARD
          deferred
          ensure
              ward_forged: Result /= Void
          end

  end
tags: [creational, factories, contracts, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory ensures that intertwined arcane wards are always created in matching pairs, bound by an unbreakable Design by Contract pact.
