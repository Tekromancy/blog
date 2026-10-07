---
title: The Observer
description: Allowing parasitic familiars to subscribe to the host's life-force fluctuations.
type: wasm
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  (module
    (type $callback (func (param i32)))
    (table 10 funcref)
    (global $sub_count (mut i32) (i32.const 0))

    (func $notify_all (param $vital_sign i32)
      (local $i i32)
      (loop $notify_loop
        (call_indirect (type $callback) (local.get $vital_sign) (local.get $i))
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br_if $notify_loop (i32.lt_u (local.get $i) (global.get $sub_count)))
      )
    )
  )
tags: [WASM, Observer, Scrying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer
Parasitic familiars must know when their host's life-force fluctuates. The `Observer` establishes a scrying link, instantly notifying all subscribed entities whenever the homunculus's vital signs cross critical thresholds.
