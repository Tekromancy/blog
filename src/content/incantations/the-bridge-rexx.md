---
title: The Bridge of Execution
description: Decouple the logical Control Node from the Execution Node implementation.
type: rexx
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Connecting"
formula: |2
  /* ooRexx Bridge */
  ::class ControlNode
  ::attribute execNode
  ::method init
    use arg execNode
  ::method execute
    self~execNode~runJob()

  ::class ExecutionNode abstract
  ::method runJob abstract

  ::class JES2Node subclass ExecutionNode
  ::method runJob
    say "Running under JES2..."
tags: [bridge, jes2, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Bridge divides the intent of the master program from the harsh reality of the execution environment, preventing monolithic entanglements.
