---
title: "The Bridge of the River Styx"
description: "Decouple an abstraction from its implementation so that the two can vary independently."
type: foxpro
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Linkage"
formula: |2
  DEFINE CLASS SpiritSummoning AS Custom
      oBinding = .NULL.

      PROCEDURE Init(oBindImpl)
          THIS.oBinding = oBindImpl
      ENDPROC

      PROCEDURE Materialize()
          THIS.oBinding.PerformBinding("Generic Spirit")
      ENDPROC
  ENDDEFINE

  DEFINE CLASS VengefulSummoning AS SpiritSummoning
      PROCEDURE Materialize()
          THIS.oBinding.PerformBinding("Vengeful Wraith")
          ? "The wraith seeks its murderer!"
      ENDPROC
  ENDDEFINE

  * Implementations
  DEFINE CLASS MemoryBinding AS Custom
      PROCEDURE PerformBinding(cEntity)
          ? "Binding " + cEntity + " strictly in RAM."
      ENDPROC
  ENDDEFINE

  DEFINE CLASS DiskBinding AS Custom
      PROCEDURE PerformBinding(cEntity)
          ? "Writing " + cEntity + " to the cursed disk platter."
      ENDPROC
  ENDDEFINE
tags: [structural, bridge, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge crosses the River Styx, letting the high-level intent of summoning vary entirely apart from whether the spirit is bound to fleeting memory or eternal magnetic storage.
