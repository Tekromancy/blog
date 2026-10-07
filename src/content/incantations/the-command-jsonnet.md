---
title: The Command of Jsonnet
description: Encapsulating operations as objects.
type: jsonnet
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delayed Execution"
formula: |2
  local AddUserCmd(user) = { action: "ADD", payload: user };
  local DelUserCmd(user) = { action: "DEL", payload: user };

  local CommandExecutor(state, cmds) = 
    std.foldl(
      function(st, cmd)
        if cmd.action == "ADD" then st + [cmd.payload]
        else if cmd.action == "DEL" then std.filter(function(x) x != cmd.payload, st)
        else st,
      cmds,
      state
    );

  {
    finalState: CommandExecutor(["alice"], [AddUserCmd("bob"), DelUserCmd("alice")])
  }
tags: [behavioral, command, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Commands are encoded as declarative objects, stored and eventually executed by an interpreter function, enabling deferred manipulation of the data state.
