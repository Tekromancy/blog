---
title: The Command Incantation in Simula
description: Encapsulating a ritual as a First Object to be invoked at a later time.
type: simula
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Invocation"
formula: |2
  Begin
      Class Command;
      Virtual: Procedure Execute;
      Begin
      End;

      Command Class ConcreteCommand(recv); Ref(Receiver) recv;
      Begin
          Procedure Execute;
          Begin
              recv.Action;
          End;
      End;
  End;
tags: [simula, gof, behavioral, invocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A spell need not be cast the moment it is spoken. The Command pattern binds the invocation and its parameters into an artifact, allowing it to be delayed, queued, or even reversed in the currents of time.
