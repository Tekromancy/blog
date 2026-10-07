---
title: "The Factory Method"
description: "A single rune delegated to manifest the desired ancient Bell Labs artifact."
type: b
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Invocation"
formula: |2
  /* The ancient spell to create entities, leaving the exact shape to the ether */

  manifest_entity(id) {
      auto ent[5];

      if (id == 1) {
          ent[0] = 'WISP';
          ent[1] = 10; /* Power */
      } else {
          ent[0] = 'DEMN';
          ent[1] = 99; /* Power */
      }

      return ent;
  }

  ritual_of_summoning() {
      auto wisp, demon;
      wisp = manifest_entity(1);
      demon = manifest_entity(2);
      /* The entities are bound to our vector */
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
