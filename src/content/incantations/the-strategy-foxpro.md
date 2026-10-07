---
title: "The Strategy of the Assassins' Guild"
description: "Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it."
type: foxpro
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Illusion // Tactics"
formula: |2
  DEFINE CLASS AssassinationStrategy AS Custom
      PROCEDURE ExecuteKill()
      ENDPROC
  ENDDEFINE

  DEFINE CLASS PoisonStrategy AS AssassinationStrategy
      PROCEDURE ExecuteKill()
          ? "Slipping nightshade into the cursor's memory space."
      ENDPROC
  ENDDEFINE

  DEFINE CLASS DaggerStrategy AS AssassinationStrategy
      PROCEDURE ExecuteKill()
          ? "A swift DELETE command from the shadows."
      ENDPROC
  ENDDEFINE

  DEFINE CLASS Assassin AS Custom
      oStrategy = .NULL.

      PROCEDURE SetStrategy(oNewStrat)
          THIS.oStrategy = oNewStrat
      ENDPROC

      PROCEDURE PerformHit()
          THIS.oStrategy.ExecuteKill()
      ENDPROC
  ENDDEFINE
tags: [behavioral, strategy, algorithms, swapping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Assassin cares not how the target meets their end. By swapping the Strategy—from poison to dagger—the master can execute identical hits on data with completely decoupled methodologies, varying them at the exact moment of execution.
