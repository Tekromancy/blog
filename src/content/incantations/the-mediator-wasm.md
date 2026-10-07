---
title: The Mediator
description: A centralized nexus channeling communications between chaotic synthetic organs.
type: wasm
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Telepathy
formula: |
  (module
    (func $notify_nexus (param $sender_id i32) (param $event i32)
      (if (i32.eq (local.get $event) (i32.const 0x01)) ;; Hunger
        (then
          (call $feed_organ (local.get $sender_id))
        )
      )
    )
    (func $feed_organ (param $organ_id i32)
      ;; Provision mana
    )
  )
tags: [WASM, Mediator, Nexus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator
Synthetic organs are prone to rebellion if left to communicate directly. The `Mediator` establishes a centralized nexus, forcing all internal telepathy to route through it, maintaining harmony and preventing cascading organ failure.
