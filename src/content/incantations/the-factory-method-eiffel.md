---
title: "The Factory Method Incantation"
description: "Delegating familiar summoning to specialized subclasses."
type: eiffel
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  deferred class
      SUMMONER

  feature -- Factory Method

      summon_familiar: FAMILIAR
          deferred
          ensure
              summoned_entity_exists: Result /= Void
          end

  feature -- Operation

      execute_summoning
          local
              fam: FAMILIAR
          do
              fam := summon_familiar
              fam.serve
          end
  end
tags: [creational, factory-method, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Factory Method delegates the exact nature of the summoned entity to the specific subclass of the summoner, bound by rigid postconditions.
