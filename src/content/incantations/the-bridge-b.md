---
title: "The Bridge"
description: "Decoupling the abstract Bell Labs invocation from its primordial implementation."
type: b
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Divination // Connection"
formula: |2
  /* Implementation plane */
  impl_a(msg) { putchar('A'); }
  impl_b(msg) { putchar('B'); }

  /* Abstraction plane holds a pointer to the implementation */
  auto current_impl;

  set_bridge(impl_ptr) {
      current_impl = impl_ptr;
  }

  invoke_abstraction(msg) {
      /* Crossing the bridge */
      current_impl(msg);
  }

  execute() {
      set_bridge(impl_a);
      invoke_abstraction(1);

      set_bridge(impl_b);
      invoke_abstraction(2);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
