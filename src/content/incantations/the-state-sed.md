---
title: The Shifting Form (State)
description: Allowing an object to alter its behavior when its internal state changes.
type: sed
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # State: Toggle state flag in hold space
  /TOGGLE_STATE/ {
    x
    /STATE_ON/ {
      s/.*/STATE_OFF/
      x
      d
    }
    s/.*/STATE_ON/
    x
    d
  }
  
  # Behavior depends on state
  /DO_ACTION/ {
    x
    /STATE_ON/ {
      x
      s/.*/Action performed because state is ON/
      p
      d
    }
    x
    s/.*/Action ignored because state is OFF/
    p
    d
  }
tags: [sed, behavioral, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
