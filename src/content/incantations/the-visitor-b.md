---
title: "The Visitor"
description: "Injecting new arcane operations into an established hierarchy of old words."
type: b
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Transmutation // Symbiosis"
formula: |2
  /* Elements have an accept function pointer */
  /* element: [accept_fn, data] */

  accept_visitor(element, visitor_fn) {
      auto fn;
      fn = element[0];
      fn(element, visitor_fn);
  }

  /* The routing */
  element_a_accept(self, visitor_fn) {
      visitor_fn(self, 'A');
  }

  /* The concrete Visitor */
  print_visitor(element, type) {
      if (type == 'A') {
          putchar('A'); putchar(element[1]);
      }
  }

  visitation() {
      auto el[2];
      el[0] = element_a_accept;
      el[1] = 'X'; /* data */

      accept_visitor(el, print_visitor);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
