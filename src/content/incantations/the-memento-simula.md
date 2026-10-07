---
title: The Memento Incantation in Simula
description: Capturing and restoring the soul-state of an object without exposing its innards.
type: simula
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Preservation"
formula: |2
  Begin
      Class Memento(state); Text state;
      Begin
          Text savedState;
          savedState :- state;
      End;

      Class Originator;
      Begin
          Text state;
          Ref(Memento) Procedure SaveToMemento; SaveToMemento :- New Memento(state);
          Procedure RestoreFromMemento(m); Ref(Memento) m; state :- m.savedState;
      End;
  End;
tags: [simula, gof, behavioral, preservation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Time is fickle, and mistakes in the simulation are fatal. The Memento extracts a snapshot of an object's essence, storing it away so that if darkness falls, the entity may be restored to its former glory.
