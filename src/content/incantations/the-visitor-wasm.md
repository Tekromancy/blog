---
title: The Visitor
description: Projecting an astral entity into the synthetic organ structures to extract telemetry without mutation.
type: wasm
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral Projection"
formula: |2
  (module
    (type $visitor (func (param i32)))
    (table 1 funcref)

    (func $visit_heart (param $visitor_idx i32)
      (call_indirect (type $visitor) (i32.const 0xHEART) (local.get $visitor_idx))
    )

    (func $telemetry_visitor (param $element i32)
      ;; Extract data based on element type
    )
  )
tags: [WASM, Visitor, Astral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Visitor
To extract telemetry from the homunculus without triggering a mutation, one must project an astral entity. The `Visitor` traverses the synthetic organ structures, reading data and performing operations without altering the underlying classes.
