---
title: The Sigil of Execution
description: Encapsulate an arcane request as a standalone object, ready for delayed casting.
type: dart
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Runesmithing"
formula: |2
  abstract class Command {
    void execute();
    void undo();
  }

  class FireballSpell {
    void ignite() => print('Fireball bursts!');
    void extinguish() => print('Flames drawn back into the void.');
  }

  class CastFireballCommand implements Command {
    final FireballSpell _spell;

    CastFireballCommand(this._spell);

    @override
    void execute() => _spell.ignite();

    @override
    void undo() => _spell.extinguish();
  }

  class Wand {
    final List<Command> _history = [];

    void invoke(Command command) {
      command.execute();
      _history.add(command);
    }

    void rewind() {
      if (_history.isNotEmpty) {
        _history.removeLast().undo();
      }
    }
  }

  void main() {
    final wand = Wand();
    final fireball = CastFireballCommand(FireballSpell());

    wand.invoke(fireball);
    wand.rewind(); // Time magic undo
  }
tags: [dart, command, undo-redo, evocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A spell isn't just an action; it can be etched into a Sigil. The Command pattern wraps an action into an object, allowing you to queue spells, pass them to asynchronous isolates, or invoke forbidden chronomancy to `undo()` them.
