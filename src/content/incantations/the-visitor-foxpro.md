---
title: "The Visitor of the Astral Projection"
description: "Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates."
type: foxpro
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral Walking"
formula: |2
  DEFINE CLASS SpiritNode AS Custom
      PROCEDURE Accept(oVisitor)
      ENDPROC
  ENDDEFINE

  DEFINE CLASS PoltergeistNode AS SpiritNode
      PROCEDURE Accept(oVisitor)
          oVisitor.VisitPoltergeist(THIS)
      ENDPROC
  ENDDEFINE

  DEFINE CLASS WraithNode AS SpiritNode
      PROCEDURE Accept(oVisitor)
          oVisitor.VisitWraith(THIS)
      ENDPROC
  ENDDEFINE

  DEFINE CLASS AstralVisitor AS Custom
      PROCEDURE VisitPoltergeist(oNode)
          ? "Analyzing the telekinetic disruption of the Poltergeist."
      ENDPROC

      PROCEDURE VisitWraith(oNode)
          ? "Measuring the cold life-drain aura of the Wraith."
      ENDPROC
  ENDDEFINE
tags: [behavioral, visitor, double-dispatch, extensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the structure of your spiritual hierarchy is rigid but you must divine entirely new properties from them, the Visitor walks among them astrally. Each entity accepts the visitor, revealing their secrets without altering their own ancient code.
