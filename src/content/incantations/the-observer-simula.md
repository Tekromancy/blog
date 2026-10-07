---
title: The Observer Incantation in Simula
description: A spectral network of subjects and their watchful familiars.
type: simula
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Vigilance"
formula: |2
  Begin
      Class Observer;
      Virtual: Procedure Update;
      Begin
      End;

      Class Subject;
      Begin
          ! Array or list of Observers;
          Procedure Notify;
          Begin
              ! Call Update on all attached observers;
          End;
      End;
  End;
tags: [simula, gof, behavioral, vigilance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer binds a subject to its familiars. When the subject undergoes a metamorphosis, a ripple in the ether alerts all dependents, who immediately shift their forms in sympathetic resonance.
