---
title: "Template Method: The Ritual Skeleton"
description: "Define the unalterable steps of a grand geomantic ritual, leaving the specific tracings and sealings to be defined by sub-procedures."
type: logo
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritualism"
formula: |2
  to grand-ritual :tracer :sealer
    ; Step 1: Preparation (Immutable)
    cs pu home pd
    setpensize 2

    ; Step 2: Trace Core (Abstract/Passed)
    run :tracer

    ; Step 3: Seal Ward (Abstract/Passed)
    run :sealer

    ; Step 4: Finalize (Immutable)
    pu home print [Ritual bound to the matrix.]
  end

  to blood-trace
    setpencolor [255 0 0]
    repeat 3 [ fd 100 rt 120 ]
  end

  to star-seal
    setpencolor [255 255 0]
    repeat 5 [ fd 50 rt 144 ]
  end

  ; Executing the skeletal ritual
  grand-ritual [blood-trace] [star-seal]
tags: [turtle-divination, sacred-geometry]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
