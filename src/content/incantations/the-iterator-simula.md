---
title: The Iterator Incantation in Simula
description: Sequentially traversing a collection of esoteric relics.
type: simula
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  Begin
      Class Iterator;
      Virtual: Ref(Item) Procedure Next;
      Virtual: Boolean Procedure IsDone;
      Begin
      End;

      Class Aggregate;
      Virtual: Ref(Iterator) Procedure CreateIterator;
      Begin
      End;
  End;
tags: [simula, gof, behavioral, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

To observe a grimoire's pages without unbinding its spine, one uses an Iterator. It reveals the elements of an aggregate sequentially, keeping the internal structure cloaked in secrecy.
