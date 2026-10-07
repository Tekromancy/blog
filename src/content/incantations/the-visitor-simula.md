---
title: The Visitor Incantation in Simula
description: Adding new operations to an ancient hierarchy without defiling its classes.
type: simula
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Conjuration // Visitation"
formula: |2
  Begin
      Class Visitor;
      Virtual: Procedure VisitElementA(e), VisitElementB(e); Ref(ElementA) e; Ref(ElementB) e;
      Begin
      End;

      Class Element;
      Virtual: Procedure Accept(v); Ref(Visitor) v;
      Begin
      End;

      Element Class ElementA;
      Begin
          Procedure Accept(v); Ref(Visitor) v; v.VisitElementA(This ElementA);
      End;
  End;
tags: [simula, gof, behavioral, visitation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the ancient classes are sealed and sacred, the Visitor allows one to traverse the hierarchy, performing new and wondrous incantations on the elements without permanently etching the changes into their structure.
