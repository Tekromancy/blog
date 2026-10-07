---
title: "The State of the Cursed Lycanthrope"
description: "Allow an object to alter its behavior when its internal state changes. The object will appear to change its class."
type: foxpro
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shapeshifting"
formula: |2
  DEFINE CLASS Lycanthrope AS Custom
      oState = .NULL.

      PROCEDURE Init
          THIS.oState = CREATEOBJECT("HumanState")
      ENDPROC

      PROCEDURE SetState(oNewState)
          THIS.oState = oNewState
      ENDPROC

      PROCEDURE ReactToMoon()
          THIS.oState.Handle(THIS)
      ENDPROC
  ENDDEFINE

  DEFINE CLASS HumanState AS Custom
      PROCEDURE Handle(oContext)
          ? "The man looks up at the full moon and screams!"
          oContext.SetState(CREATEOBJECT("WolfState"))
      ENDPROC
  ENDDEFINE

  DEFINE CLASS WolfState AS Custom
      PROCEDURE Handle(oContext)
          ? "The beast howls and hunts for blood!"
          * Might revert back on new moon
      ENDPROC
  ENDDEFINE
tags: [behavioral, state, fsm, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

As the moon cycles, the Lycanthrope's very essence alters. The State pattern prevents monstrous `DO CASE` blocks, letting the entity simply swap its internal soul-core to change its behavior dynamically at runtime.
