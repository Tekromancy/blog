---
title: The Sigil Command
description: Encapsulate a magical request as an object, allowing for parameterization and queuing of rituals.
type: javascript
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Runecrafting"
formula: |2
  class LeylineReceiver {
    surge() { console.log("Leyline surges with power!"); }
    drain() { console.log("Leyline drained of magic."); }
  }

  class SurgeCommand {
    constructor(receiver) { this.receiver = receiver; }
    execute() { this.receiver.surge(); }
    undo() { this.receiver.drain(); }
  }

  class Invoker {
    constructor() { this.history = []; }
    invoke(command) {
      command.execute();
      this.history.push(command);
    }
    revert() {
      const command = this.history.pop();
      if (command) command.undo();
    }
  }

  const leyline = new LeylineReceiver();
  const surgeSpell = new SurgeCommand(leyline);
  const caster = new Invoker();

  caster.invoke(surgeSpell);
  caster.revert();
tags: [encapsulation, undo, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Sigil Command

A spell can be inscribed as a sigil, holding the intent and the action in stasis until triggered. This encapsulation allows spells to be queued, delayed, or even inverted.
