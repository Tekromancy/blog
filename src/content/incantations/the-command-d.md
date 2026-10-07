---
title: Command
description: Encapsulate a magical incantation as an object, allowing it to be queued, logged, or undone by the temporal weave.
type: d
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Ritual Queuing"
formula: |2
  interface IIncantation { void execute(); void undo(); }

  class TeleportCommand : IIncantation {
      override void execute() { /* Teleport forward */ }
      override void undo() { /* Rewind teleportation */ }
  }

  class ChronoTracker {
      private IIncantation[] history;
      void castSpell(IIncantation inc) {
          inc.execute();
          history ~= inc;
      }
  }
tags: [behavioral, command, dlang, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Time-shifting arrays holding encapsulated spells for deferred execution or reversion.
