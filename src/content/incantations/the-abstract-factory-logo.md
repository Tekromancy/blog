---
title: "Abstract Factory: The Lexicon of the Twin Grimoires"
description: "Abstract the summoning of geometric wards, allowing the divination sequence to seamlessly switch between Neon and Void aesthetics."
type: logo
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Sigilmancy"
formula: |2
  to neon-factory
    output [ [ward neon-ward] [binding neon-binding] ]
  end

  to void-factory
    output [ [ward void-ward] [binding void-binding] ]
  end

  to neon-ward
    setpencolor [0 255 255]
    repeat 3 [ fd 100 rt 120 ]
  end

  to void-ward
    setpencolor [50 0 50]
    repeat 8 [ fd 50 rt 45 ]
  end

  to summon-sigil :factory :type
    localmake "recipe assoc :type :factory
    if not empty? :recipe [ run list last :recipe ]
  end

  ; Divination sequence
  make "current-grimoire neon-factory
  summon-sigil :current-grimoire "ward
tags: [turtle-divination, sacred-geometry]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
