---
title: The Command Incantation
description: Encapsulating a spell cast as an object to allow for deferred execution or undoing.
type: mathematica
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  (* The Command Object *)
  ClearAll[CreateSpellCommand, ExecuteCommand, UndoCommand];

  CreateSpellCommand[spell_, target_] := 
    <|"Spell" -> spell, "Target" -> target, "Status" -> "Prepared"|>;

  (* The Invoker *)
  ExecuteCommand[cmd_Association] := Module[{updatedCmd},
    Print["Casting ", cmd["Spell"], " on ", cmd["Target"]];
    updatedCmd = Append[cmd, "Status" -> "Cast"];
    updatedCmd
  ];

  UndoCommand[cmd_Association] := Module[{updatedCmd},
    If[cmd["Status"] === "Cast",
      Print["Reversing ", cmd["Spell"], " on ", cmd["Target"]];
      updatedCmd = Append[cmd, "Status" -> "Reversed"];
      updatedCmd,

      Print["Cannot reverse an uncast spell."];
      cmd
    ]
  ];

  (* Usage *)
  cmd = CreateSpellCommand["Petrify", "Goblin"];
  executed = ExecuteCommand[cmd];
  reversed = UndoCommand[executed];
tags: [command, behavioral, deferred, associations]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
