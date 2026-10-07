---
title: "The Proxy of the Guardian Gargoyle"
description: "Provide a surrogate or placeholder for another object to control access to it."
type: foxpro
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  DEFINE CLASS ForbiddenTome AS Custom
      PROCEDURE ReadSecrets()
          ? "Reading the unspeakable truths of FoxPro array dimensioning."
      ENDPROC
  ENDDEFINE

  DEFINE CLASS TomeProxy AS Custom
      oRealTome = .NULL.
      nClearanceLevel = 0

      PROCEDURE Init(nLevel)
          THIS.nClearanceLevel = nLevel
      ENDPROC

      PROCEDURE ReadSecrets()
          IF THIS.nClearanceLevel < 99
              ? "The Gargoyle awakens and repels you! Access Denied."
          ELSE
              IF ISNULL(THIS.oRealTome)
                  THIS.oRealTome = CREATEOBJECT("ForbiddenTome")
              ENDIF
              THIS.oRealTome.ReadSecrets()
          ENDIF
      ENDPROC
  ENDDEFINE
tags: [structural, proxy, access-control, lazy-loading]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Proxy stands as a stone guardian before the true power. It may delay the expensive summoning of the entity until truly necessary, or it may entirely forbid access to those lacking the arcane clearance.
