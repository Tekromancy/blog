---
title: State (Forth)
description: Mutate an entity's soul dynamically via XT vectoring.
type: forth
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Soul-Shifting"
formula: |2
  \ Soul-Shifting: The State Pattern
  \ Changing the behavior of a word by updating a DEFER.

  DEFER BEHAVIOR

  : PEACEFUL-STATE ( -- ) ." The golem stands idle." CR ;
  : ENRAGED-STATE ( -- ) ." The golem SMASHES!" CR ;

  : PROVOKE ( -- )
    ' ENRAGED-STATE IS BEHAVIOR
    ." Golem provoked!" CR ;

  : CALM ( -- )
    ' PEACEFUL-STATE IS BEHAVIOR
    ." Golem pacified." CR ;

  \ Usage:
  \ CALM BEHAVIOR
  \ PROVOKE BEHAVIOR
tags: [behavioral, state, forth, mutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern alters an entity's entire paradigm without changing its identifier. By heavily leveraging `DEFER` and `IS`, a word's underlying execution vector changes dynamically. The entity behaves entirely differently based on the soul currently bound to it.
