---
title: "The Chain of Responsibility of the Underworld Judges"
description: "Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request."
type: foxpro
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Command Delegation"
formula: |2
  DEFINE CLASS UnderworldJudge AS Custom
      oNextJudge = .NULL.

      PROCEDURE SetNext(oJudge)
          THIS.oNextJudge = oJudge
      ENDPROC

      PROCEDURE JudgeSoul(nSins)
          IF !ISNULL(THIS.oNextJudge)
              THIS.oNextJudge.JudgeSoul(nSins)
          ENDIF
      ENDPROC
  ENDDEFINE

  DEFINE CLASS LesserDemon AS UnderworldJudge
      PROCEDURE JudgeSoul(nSins)
          IF nSins < 10
              ? "Lesser Demon claims the soul for the salt mines."
          ELSE
              DODEFAULT(nSins)
          ENDIF
      ENDPROC
  ENDDEFINE

  DEFINE CLASS Archfiend AS UnderworldJudge
      PROCEDURE JudgeSoul(nSins)
          IF nSins >= 10
              ? "Archfiend drags the heavy soul into the abyss."
          ELSE
              DODEFAULT(nSins)
          ENDIF
      ENDPROC
  ENDDEFINE
tags: [behavioral, chain-of-responsibility, delegation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The incoming soul drifts down the chain of Underworld Judges. Each judge inspects the entity, deciding whether to devour it or pass it deeper into the abyss. The summoner need not know which entity will ultimately claim the request.
