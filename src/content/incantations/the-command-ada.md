---
title: The Command Incantation
description: Encapsulating tactical ward deployments as executable, queueable objects.
type: ada
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Abjuration // Tactical Execution"
formula: |2
  package Ward_Commands is

     type Command is abstract tagged null record;
     procedure Execute (C : in Command) is abstract;
     procedure Undo (C : in Command) is abstract;

     type Receiver is tagged null record;
     procedure Activate_Rune (R : in Receiver);
     procedure Deactivate_Rune (R : in Receiver);

     type Deploy_Rune_Command is new Command with record
        Target : access Receiver;
     end record;

     overriding procedure Execute (C : in Deploy_Rune_Command);
     overriding procedure Undo (C : in Deploy_Rune_Command);

  end Ward_Commands;

  package body Ward_Commands is
     procedure Activate_Rune (R : in Receiver) is begin null; end;
     procedure Deactivate_Rune (R : in Receiver) is begin null; end;

     procedure Execute (C : in Deploy_Rune_Command) is
     begin
        C.Target.Activate_Rune;
     end Execute;

     procedure Undo (C : in Deploy_Rune_Command) is
     begin
        C.Target.Deactivate_Rune;
     end Undo;
  end Ward_Commands;
tags: [ada, abjuration, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In chaotic engagements, commands must be queued, logged, and potentially reversed. By encapsulating a spellcast into an object, the military can audit exactly which ward was deployed and roll back magical fatigue safely if conditions permit.
