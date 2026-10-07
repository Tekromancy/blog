---
title: "The Command Incantation in Carbon"
description: "Encapsulate a request as an object, allowing for parameterization, queuing, and undoing of spells."
type: carbon
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Spell Storing"
formula: |2
  package Command api;

  interface CommandObj {
    fn Execute[me: Self]();
    fn Undo[me: Self]();
  }

  class Drone {
    fn MoveForward[me: Self]() {}
    fn MoveBackward[me: Self]() {}
  }

  class MoveCommand {
    var target: Drone*;

    impl as CommandObj {
      fn Execute[me: Self]() {
        (*me.target).MoveForward();
      }
      fn Undo[me: Self]() {
        (*me.target).MoveBackward();
      }
    }
  }

  class CommandQueue {
    var history: MoveCommand; // simplified for single history
    
    fn ExecuteCommand[addr me: Self*>(cmd: MoveCommand) {
      cmd.Execute();
      (*me).history = cmd;
    }

    fn UndoLast[addr me: Self*]() {
      (*me).history.Undo();
    }
  }
tags: [behavioral, carbon, delayed execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command: Encapsulated Will

To issue a direct function call is to force immediate action. But what if the execution must be delayed, queued, logged, or reversed? The Command pattern encapsulates the intent to cast a spell into a tangible object.

By wrapping actions against a `Drone` into a `MoveCommand` that implements the `CommandObj` interface, a Carbon application can build macro-recorders, transaction logs, and undo-stacks. The Successor Pact gives us the exact structural rigidity needed to turn verbs into safely transportable nouns.
