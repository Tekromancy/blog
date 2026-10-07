---
title: Encapsulated TSO Command
description: Encapsulate a TSO command as an object for delayed execution.
type: rexx
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  /* ooRexx Command */
  ::class TSOCommand
  ::attribute cmdStr
  ::method init
    use arg cmd
    self~cmdStr = cmd
  ::method execute
    say "Address TSO:" self~cmdStr

  ::class Invoker
  ::attribute history
  ::method init
    self~history = .array~new()
  ::method storeAndExecute
    use arg command
    self~history~append(command)
    command~execute()
tags: [command, tso, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By binding a raw TSO string into a Command object, the invocation can be queued, logged, or reversed by the master script.
