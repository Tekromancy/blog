---
title: The Visitor
description: Represent an operation to be performed on the elements of an object structure without changing the classes of the elements on which it operates.
type: pli
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  /* The Visitor */
  VISITOR: PROC OPTIONS(MAIN);
     DCL 1 ELEMENT BASED(E_PTR),
           2 ACCEPT ENTRY(POINTER);
     DCL 1 VISITOR_STRUCT BASED(V_PTR),
           2 VISIT_ELEMENT ENTRY(POINTER);
     PUT SKIP LIST('Visitor traversing the syntax tree...');
  END VISITOR;
tags: [visitor, traversal, operation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor double-dispatches through structures and pointers, separating the logic of operations from the structural hierarchy of the mainframe data.
