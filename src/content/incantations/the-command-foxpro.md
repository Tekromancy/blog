---
title: "The Command of the Sealed Scroll"
description: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations."
type: foxpro
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Transmutation // Rune Sealing"
formula: |2
  DEFINE CLASS Command AS Custom
      PROCEDURE Execute()
      ENDPROC
  ENDDEFINE

  DEFINE CLASS PurgeTableCommand AS Command
      cTableName = ""

      PROCEDURE Init(cName)
          THIS.cTableName = cName
      ENDPROC

      PROCEDURE Execute()
          ? "ZAPping the cursed table: " + THIS.cTableName
      ENDPROC
  ENDDEFINE

  DEFINE CLASS Invoker AS Custom
      DIMENSION aSpells[1]
      nSpellCount = 0

      PROCEDURE StoreSpell(oCmd)
          THIS.nSpellCount = THIS.nSpellCount + 1
          DIMENSION THIS.aSpells[THIS.nSpellCount]
          THIS.aSpells[THIS.nSpellCount] = oCmd
      ENDPROC

      PROCEDURE Unleash()
          LOCAL i
          FOR i = 1 TO THIS.nSpellCount
              THIS.aSpells[i].Execute()
          ENDFOR
      ENDPROC
  ENDDEFINE
tags: [behavioral, command, encapsulation, invocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A Command is a spell sealed inside a scroll. It can be handed to an acolyte, stored in a dusty archive, or queued for a grand ritual later. The execution is perfectly decoupled from its utterance.
