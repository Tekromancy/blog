---
title: The Proxy Incantation in Simula
description: A spectral placeholder controlling access to a true object.
type: simula
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Interception"
formula: |2
  Begin
      Class Subject;
      Virtual: Procedure Request;
      Begin
      End;

      Subject Class Proxy;
      Begin
          Ref(Subject) realSubject;
          Procedure Request;
          Begin
              If realSubject == None Then realSubject :- New RealSubject;
              realSubject.Request;
          End;
      End;
  End;
tags: [simula, gof, structural, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy is an effigy, standing in for an object that is too heavy, remote, or dangerous to instantiate immediately. It guards the gates and manages the lifecycle of the true entity behind the veil.
