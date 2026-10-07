---
title: "Bridge: Decoupling Ink and Intent"
description: "Separate the geometry's abstract structure from its rendering medium (screen vs astral log), allowing independent evolution."
type: logo
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Channeling"
formula: |2
  ; Mediums (Implementors)
  to render-screen :action :val
    if equal? :action "move [ fd :val ]
    if equal? :action "turn [ rt :val ]
  end

  to render-log :action :val
    print sentence [Astal record updated:] sentence :action :val
  end

  ; Geometries (Abstractions)
  to trace-triangle :medium
    repeat 3 [
      run list :medium "move 50
      run list :medium "turn 120
    ]
  end

  ; Bridging intent with rendering
  make "current-medium "render-screen
  trace-triangle :current-medium

  make "current-medium "render-log
  trace-triangle :current-medium
tags: [turtle-divination, sacred-geometry]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
