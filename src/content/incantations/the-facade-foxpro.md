---
title: "The Facade of the Dark Citadel"
description: "Provide a unified interface to a set of interfaces in the necromantic subsystem."
type: foxpro
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Abjuration // Gateway Sealing"
formula: |2
  DEFINE CLASS CitadelFacade AS Custom
      oSummoning = .NULL.
      oBinding = .NULL.
      oHarvesting = .NULL.

      PROCEDURE Init
          THIS.oSummoning = CREATEOBJECT("SummoningSubsystem")
          THIS.oBinding = CREATEOBJECT("BindingSubsystem")
          THIS.oHarvesting = CREATEOBJECT("HarvestingSubsystem")
      ENDPROC

      PROCEDURE RaiseArmy()
          THIS.oSummoning.Chant()
          THIS.oBinding.SealRunes()
          THIS.oHarvesting.ReapSouls()
          ? "The dead march upon the living."
      ENDPROC
  ENDDEFINE

  DEFINE CLASS SummoningSubsystem AS Custom
      PROCEDURE Chant
      ENDPROC
  ENDDEFINE

  DEFINE CLASS BindingSubsystem AS Custom
      PROCEDURE SealRunes
      ENDPROC
  ENDDEFINE

  DEFINE CLASS HarvestingSubsystem AS Custom
      PROCEDURE ReapSouls
      ENDPROC
  ENDDEFINE
tags: [structural, facade, simplification, sub-systems]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Facade obscures the hideous complexities of managing multiple terrifying subsystems. To raise an army, one simply pulls the grand lever of the Dark Citadel, rather than directly coercing individual sects of warlocks.
