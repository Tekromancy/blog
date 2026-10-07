---
title: "Visitor: The Wandering Sage"
description: "Represent an operation to be performed on the elements of an object structure."
type: rpg
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Conjuration // Teleportation"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Element_t Qualified Template;
    Type Char(10);
    Data Pointer;
  End-Ds;

  Dcl-Proc AcceptVisitor Export;
    Dcl-Pi *N;
      pElement Pointer Value;
      pVisitorLogic Pointer(*Proc) Value;
    End-Pi;

    Dcl-Ds Elem Likeds(Element_t) Based(pElement);
    Dcl-Pr Visit ExtProc(pVisitorLogic);
      pElem Pointer Value;
    End-Pr;

    Visit(pElement);
  End-Proc;
tags: [behavioral, ibm-i, runes, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# Visitor

When dealing with a complex Data Structure representing differing record types, adding new operations can muddy the entities. The Visitor pattern abstracts the operation away, acting as a Wandering Sage that traverses the structure and performs logic on each element externally.
