---
title: Template Method (Forth)
description: Lay the skeletal framework and let the subclasses flesh it out.
type: forth
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Skeleton-Weaving"
formula: |2
  \ Skeleton-Weaving: The Template Method
  \ A rigid skeleton word calling deferred implementation steps.

  DEFER PREPARE-INGREDIENTS
  DEFER BREW-POTION

  \ The Template Word
  : CRAFT-ELIXIR ( -- )
    ." Heating cauldron..." CR
    PREPARE-INGREDIENTS
    BREW-POTION
    ." Elixir bottled." CR ;

  : PREP-HEAL ( -- ) ." Grinding root." CR ;
  : BREW-HEAL ( -- ) ." Simmering until red." CR ;

  \ Usage:
  \ ' PREP-HEAL IS PREPARE-INGREDIENTS
  \ ' BREW-HEAL IS BREW-POTION
  \ CRAFT-ELIXIR
tags: [behavioral, template-method, forth, skeletons]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method establishes the unchangeable skeleton of a ritual. By defining the high-level control flow with deferred sub-steps, the master necromancer ensures the ritual order is obeyed, leaving only the specific flesh and sinew to be provided by later bindings.
