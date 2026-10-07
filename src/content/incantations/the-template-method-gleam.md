---
title: The Template Method
description: Skeleton algorithms with function injection.
type: gleam
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Frameworks"
formula: |2
  pub type RitualHooks {
    RitualHooks(
      chant: fn() -> String,
      sacrifice: fn() -> String,
    )
  }

  pub fn perform_ritual(hooks: RitualHooks) -> String {
    let part1 = hooks.chant()
    let part2 = hooks.sacrifice()
    part1 <> " and then " <> part2 <> " - The ritual is complete!"
  }
tags: [evocation, template-method, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Template Method
Instead of overriding class methods, we provide a record of hook functions to a skeleton algorithm.
