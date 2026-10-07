---
title: State of the Spool
description: Represent the lifecycle of a batch job (Submitted, Executing, Purged).
type: rexx
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Evolution"
formula: |2
  /* ooRexx State */
  ::class JobContext
  ::attribute state
  ::method init
    self~state = .SubmittedState~new()
  ::method advance
    self~state~nextState(self)

  ::class JobState abstract
  ::method nextState abstract

  ::class SubmittedState subclass JobState
  ::method nextState
    use arg context
    say "Transitioning from Submitted to Executing."
    context~state = .ExecutingState~new()
tags: [state, lifecycle, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A job's essence transforms from Submitted to Executing to Purged. The State pattern ensures behavior morphs accordingly to its current phase of existence.
