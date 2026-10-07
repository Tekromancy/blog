---
title: "Observer: The Resonance of the Grid"
description: "Register multiple geometric seals to listen for a shift in the global magical resonance, triggering their visual updates simultaneously."
type: logo
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Resonance"
formula: |2
  make "observers []

  to attach-observer :obs
    make "observers lput :obs :observers
  end

  to notify-observers :resonance-level
    foreach :observers [ run list ? :resonance-level ]
  end

  to seal-alpha :res
    pu setpos [50 50] pd
    setpensize :res
    arc 360 20
  end

  to seal-beta :res
    pu setpos [-50 -50] pd
    setpensize :res
    repeat 4 [ fd 20 rt 90 ]
  end

  ; Setup the network
  attach-observer "seal-alpha
  attach-observer "seal-beta

  ; A massive shift in resonance occurs
  notify-observers 5
tags: [turtle-divination, reactive-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
