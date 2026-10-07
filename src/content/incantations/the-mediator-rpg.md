---
title: "Mediator: The Central Nexus"
description: "Define an object that encapsulates how a set of objects interact."
type: rpg
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Proc UI_Mediator Export;
    Dcl-Pi *N Ind;
      EventSource Char(10) Const;
      EventAction Char(10) Const;
    End-Pi;

    // Instead of subfiles knowing about each other, they speak through the Mediator
    Select;
      When EventSource = 'SUBFILE1' and EventAction = 'SELECT';
        UpdateSubfile2();
        ShowDetailsPanel();
      When EventSource = 'BTN_SAVE' and EventAction = 'CLICK';
        ValidateSubfiles();
        CommitDB2Transaction();
    EndSl;

    Return *On;
  End-Proc;
tags: [behavioral, ibm-i, runes, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Mediator

In the tangled web of display files (DSPF) and complex interactive programs, the Mediator pattern untangles the direct coupling. All components report state changes to the Central Nexus, which then decides how the rest of the application must react.
