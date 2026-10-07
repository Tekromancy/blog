---
title: "State: The Shifting Form"
description: "Allow an object to alter its behavior when its internal state changes."
type: rpg
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Document_t Qualified Template;
    StateProc Pointer(*Proc); // The current behavior
    Id Int(10);
  End-Ds;

  Dcl-Proc ProcessDoc Export;
    Dcl-Pi *N;
      pDoc Pointer Value;
    End-Pi;

    Dcl-Ds Doc Likeds(Document_t) Based(pDoc);
    Dcl-Pr RunStateLogic ExtProc(Doc.StateProc);
      pSelf Pointer Value;
    End-Pr;

    RunStateLogic(pDoc);
  End-Proc;
tags: [behavioral, ibm-i, runes, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# State

Instead of relying on massive, nested IF/ELSE logic based on status codes (e.g., 'NEW', 'APPROVED', 'SHIPPED'), the State pattern alters the very procedure pointer mapped to the entity. As the document flows through the system, its methods inherently change.
