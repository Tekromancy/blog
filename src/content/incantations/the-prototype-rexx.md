---
title: The Prototype of the Spool
description: Clone existing job configurations instead of rebuilding them.
type: rexx
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  /* ooRexx Prototype */
  ::class JobConfig
  ::attribute memory
  ::attribute class
  ::method init
    use arg memory, class
    self~memory = memory
    self~class = class
  ::method clone
    return .JobConfig~new(self~memory, self~class)
tags: [prototype, cloning, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Instead of forging a new execution context from scratch, we copy the memory maps of successful spells using the Prototype pattern.
