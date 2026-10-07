---
title: "The Mediator of the Coven"
description: "Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly."
type: foxpro
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  DEFINE CLASS CovenMediator AS Custom
      oWitch1 = .NULL.
      oWitch2 = .NULL.

      PROCEDURE Register(oW1, oW2)
          THIS.oWitch1 = oW1
          THIS.oWitch2 = oW2
          oW1.SetMediator(THIS)
          oW2.SetMediator(THIS)
      ENDPROC

      PROCEDURE Notify(oSender, cEvent)
          IF oSender = THIS.oWitch1
              THIS.oWitch2.ReactTo(cEvent)
          ELSE
              THIS.oWitch1.ReactTo(cEvent)
          ENDIF
      ENDPROC
  ENDDEFINE

  DEFINE CLASS CovenWitch AS Custom
      oMediator = .NULL.
      cName = ""

      PROCEDURE Init(cName)
          THIS.cName = cName
      ENDPROC

      PROCEDURE SetMediator(oMed)
          THIS.oMediator = oMed
      ENDPROC

      PROCEDURE CastSpell()
          ? THIS.cName + " casts a blood hex!"
          THIS.oMediator.Notify(THIS, "BloodHexCast")
      ENDPROC

      PROCEDURE ReactTo(cEvent)
          ? THIS.cName + " reacts to: " + cEvent
      ENDPROC
  ENDDEFINE
tags: [behavioral, mediator, decoupling, communication]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In a dark coven, directly whispering into another witch's mind invites psychic feedback loops. The Mediator stands in the center of the pentagram, taking the raw intent of one participant and securely distributing the ripples to the others.
