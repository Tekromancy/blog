---
title: The Prototype of Cloning Sigils
description: Use the `copy` ability in Move as the Prototype pattern for rapid resource cloning.
type: move
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Shadowcasting"
formula: |2
  module arcane::prototype {
      struct Sigil has copy, drop, store {
          pattern_id: u64,
          energy: u64,
      }
  
      // Move's `copy` ability acts as the Prototype pattern
      public fun clone_sigil(sigil: &Sigil): Sigil {
          *sigil
      }
  }
tags: [creational, prototype, move, sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
