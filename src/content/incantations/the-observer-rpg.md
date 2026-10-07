---
title: "Observer: The Watching Wards"
description: "Define a one-to-many dependency so that when one object changes state, dependents are notified."
type: rpg
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Subject_t Qualified Template;
    ObserverCount Int(10);
    Observers Pointer Dim(10); // Array of Procedure Pointers
  End-Ds;

  Dcl-Proc NotifyObservers Export;
    Dcl-Pi *N;
      pSubject Pointer Value;
      EventData Char(50) Const;
    End-Pi;

    Dcl-Ds Subject Likeds(Subject_t) Based(pSubject);
    Dcl-S i Int(10);
    Dcl-Pr OnUpdate ExtProc(Subject.Observers(i));
      Data Char(50) Const;
    End-Pr;

    For i = 1 to Subject.ObserverCount;
       OnUpdate(EventData);
    EndFor;
  End-Proc;
tags: [behavioral, ibm-i, runes, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Observer

Through arrays of callback procedure pointers, a central subject on the iSeries can broadcast changes to multiple Watching Wards. This is particularly useful when updating a central file must trigger updates in auxiliary indexes or data queues.
