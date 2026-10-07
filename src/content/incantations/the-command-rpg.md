---
title: "Command: Encapsulated Invocation"
description: "Encapsulate a request as an object, allowing parameterization and queuing."
type: rpg
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Charm"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Command_t Qualified Template;
    ExecuteProc Pointer(*Proc);
    Payload Char(100);
  End-Ds;

  Dcl-Proc InvokeCommand Export;
    Dcl-Pi *N;
      pCommand Pointer Value;
    End-Pi;

    Dcl-Ds Cmd Likeds(Command_t) Based(pCommand);
    Dcl-Pr RunCmd ExtProc(Cmd.ExecuteProc);
      Data Char(100) Const;
    End-Pr;

    RunCmd(Cmd.Payload);
  End-Proc;
tags: [behavioral, ibm-i, runes, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Command

By capturing a procedure pointer and its arguments in a single Data Structure, the Command pattern lets you queue invocations in a data queue (`DTAQ`) or defer their execution until the appropriate subsystem becomes available.
