---
title: "The Mediator Coven"
description: "Centralizing complex communications between warlocks."
type: eiffel
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Telepathy"
formula: |2
  deferred class
      COVEN_MEDIATOR

  feature
      notify (sender: WARLOCK; event: STRING)
          deferred
          end
  end

  class
      WARLOCK

  feature
      mediator: COVEN_MEDIATOR

      send_signal
          do
              mediator.notify (Current, "DANGER")
          end
  end
tags: [behavioral, mediator, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Mediator centralizes the telepathic web of a coven. Warlocks only speak to the Mediator, strictly bounding the chaotic N-to-N communication graph.
