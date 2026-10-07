---
title: "The Command Hex"
description: "Encapsulating a request as an attribute set."
type: nix
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Divination // Pure Environment Hexes"
formula: |2
  let
    # Receiver
    osHexes = {
      rebuild = config: "Rebuilding OS with ''${config}";
      rollback = "Rolling back to previous generation";
    };

    # Commands (Encapsulating the action and arguments)
    rebuildCommand = config: {
      execute = osHexes.rebuild config;
      name = "RebuildCommand";
    };

    rollbackCommand = {
      execute = osHexes.rollback;
      name = "RollbackCommand";
    };

    # Invoker
    executeCommands = cmds: map (cmd: "Executed: ''${cmd.execute}") cmds;
  in
  executeCommands [
    (rebuildCommand "flake.nix")
    rollbackCommand
  ]
tags: [behavioral, command, nix, encapsulation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command pattern encapsulates requests as closures or attribute sets containing an `execute` mechanism. It isolates the invoker from the receiver, allowing arrays of commands to be queued, logged, or evaluated sequentially within the pure environment.
