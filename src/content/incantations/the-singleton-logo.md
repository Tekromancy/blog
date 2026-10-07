---
title: "Singleton: The Absolute Origin Point"
description: "Ensure that only one sacred center exists in the divination sequence, storing the absolute anchor coordinate."
type: logo
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Anchoring"
formula: |2
  to get-origin
    if not namep "absolute-origin [
      make "absolute-origin pos
      print [The sacred center has been established.]
    ]
    output :absolute-origin
  end

  to return-to-origin
    pu
    setpos get-origin
    pd
  end

  ; Divination wanderings
  fd 100 rt 45 fd 200
  ; Recall the singularity
  return-to-origin
tags: [turtle-divination, global-state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
