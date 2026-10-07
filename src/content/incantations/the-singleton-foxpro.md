---
title: "The Singleton of the Arch-Lich"
description: "Ensure a class only has one instance, and provide a global point of access to the undead master."
type: foxpro
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Soul Binding"
formula: |2
  * In VFP, true Singletons are tricky. We often use a global reference or a specific manager.

  DEFINE CLASS ArchLich AS Custom
      Instance = .NULL.

      FUNCTION GetInstance()
          IF ISNULL(THIS.Instance)
              THIS.Instance = CREATEOBJECT("LichCore")
          ENDIF
          RETURN THIS.Instance
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS LichCore AS Custom
      Grimoire = "Dark Secrets of DBF"

      PROCEDURE Speak
          ? "There is only one true master of the dead records."
      ENDPROC
  ENDDEFINE

  * Typically the ArchLich object itself would be bound to _SCREEN or a global variable.
  * _SCREEN.AddProperty("oArchLich", CREATEOBJECT("ArchLich"))
tags: [creational, singleton, global, uniqueness]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Arch-Lich must reign alone. Attempting to summon multiple lords of the undeath leads only to chaos and conflicting record locks. The Singleton binds the entity to a singular, accessible manifestation.
