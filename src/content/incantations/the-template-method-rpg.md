---
title: "Template Method: The Skeletal Spell"
description: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses."
type: rpg
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Bone"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds TemplateHooks_t Qualified Template;
    Initialize Pointer(*Proc);
    ProcessRecord Pointer(*Proc);
    Finalize Pointer(*Proc);
  End-Ds;

  Dcl-Proc ExecuteBatchJob Export;
    Dcl-Pi *N;
      pHooks Pointer Value;
    End-Pi;

    Dcl-Ds Hooks Likeds(TemplateHooks_t) Based(pHooks);
    // ... define Dcl-Pr for each hook ...

    // The Template Execution
    CallInit();
    Dow Not %Eof(MyFile);
       Read MyFile;
       CallProcess();
    EndDo;
    CallFinalize();
  End-Proc;
tags: [behavioral, ibm-i, runes, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Template Method

Mainframe batch jobs usually follow a strict sequence: Initialization, The Processing Loop, and Finalization. The Template Method cements this skeleton in a generic routine, requiring developers only to provide the specific Wards for the variant steps.
