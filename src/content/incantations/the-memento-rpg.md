---
title: "Memento: The Time-Twisting Sigil"
description: "Capture and externalize an object's internal state so it can be restored later."
type: rpg
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds State_t Qualified Template;
    RecordId Int(10);
    Value Char(50);
  End-Ds;

  Dcl-Proc CreateMemento Export;
    Dcl-Pi *N Pointer;
      pCurrentState Pointer Value;
    End-Pi;

    Dcl-S pMemento Pointer;
    Dcl-Ds Current Likeds(State_t) Based(pCurrentState);
    Dcl-Ds Memento Likeds(State_t) Based(pMemento);

    pMemento = %Alloc(%Size(State_t));
    Memento = Current; // Snapshot

    Return pMemento;
  End-Proc;

  Dcl-Proc RestoreMemento Export;
    Dcl-Pi *N;
      pCurrentState Pointer Value;
      pMemento Pointer Value;
    End-Pi;
    // ... copy back
  End-Proc;
tags: [behavioral, ibm-i, runes, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Memento

Often required during massive DB2 update transactions or interactive record editing, the Memento pattern safely stashes a memory-copy of the data structure. If the user cancels the spell, the original state is instantaneously restored.
