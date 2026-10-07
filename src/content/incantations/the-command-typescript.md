---
title: The Command
description: Encapsulating an arcane request as a strict object, allowing for queueing and undoable magic.
type: typescript
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation Logic"
formula: |2
  interface SpellCommand {
    execute(): void;
    undo(): void;
  }
  
  class SummonFamiliarCommand implements SpellCommand {
    constructor(private familiarName: string) {}
    execute() { console.log(`Summoned ${this.familiarName}.`); }
    undo() { console.log(`Banished ${this.familiarName}.`); }
  }
  
  class CastingQueue {
    private history: SpellCommand[] = [];
    cast(cmd: SpellCommand) {
      cmd.execute();
      this.history.push(cmd);
    }
    revertLast() {
      const cmd = this.history.pop();
      if (cmd) cmd.undo();
    }
  }
tags: [behavioral, typescript, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command pattern encapsulates a request as an object, letting you parameterize clients with different requests, queue or log requests, and support undoable operations. This transforms ephemeral spellcasting into a trackable, reversible sequence of strict typed events.
