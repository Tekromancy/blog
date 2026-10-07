---
title: "The Memento of the Phylactery"
description: "Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later."
type: foxpro
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Time Reversal"
formula: |2
  DEFINE CLASS Phylactery AS Custom
      State = ""

      PROCEDURE Init(cState)
          THIS.State = cState
      ENDPROC

      FUNCTION GetState()
          RETURN THIS.State
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS Lich AS Custom
      CurrentPower = "Weakened"

      FUNCTION SaveToPhylactery()
          RETURN CREATEOBJECT("Phylactery", THIS.CurrentPower)
      ENDFUNC

      PROCEDURE RestoreFromPhylactery(oPhylactery)
          THIS.CurrentPower = oPhylactery.GetState()
          ? "Lich power restored to: " + THIS.CurrentPower
      ENDPROC

      PROCEDURE GainPower()
          THIS.CurrentPower = "Godlike"
      ENDPROC
  ENDDEFINE
tags: [behavioral, memento, state, undo]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Lich hides its soul in a Phylactery (the Memento) to survive catastrophic failure. When its physical form is annihilated in memory, the master object can simply restore the precise configuration of its dark essence from the saved crystal.
