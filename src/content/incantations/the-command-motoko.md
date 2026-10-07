---
title: The Command Hex
description: Encapsulating an arcane imperative as an object, allowing for queued rituals and reversals.
type: motoko
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Actor Model Hexes"
formula: |2
  module Command {
    public type Command = {
      execute : () -> async Text;
    };
  
    public class Familiar() {
      public func fetchSoul() : async Text { "Soul fetched." };
      public func sweepTower() : async Text { "Tower swept." };
    };
  
    public class FetchSoulCommand(familiar : Familiar) {
      public func execute() : async Text {
        await familiar.fetchSoul();
      };
    };
  
    public class SweepTowerCommand(familiar : Familiar) {
      public func execute() : async Text {
        await familiar.sweepTower();
      };
    };
  
    public actor Archmage {
      let minion = Familiar();
      var ritualQueue : [Command] = [];
  
      public func queueFetch() : async () {
        ritualQueue := Array.append(ritualQueue, [FetchSoulCommand(minion)]);
      };
  
      public func queueSweep() : async () {
        ritualQueue := Array.append(ritualQueue, [SweepTowerCommand(minion)]);
      };
  
      public func executeRituals() : async [Text] {
        var results : [Text] = [];
        for (cmd in ritualQueue.vals()) {
          let res = await cmd.execute();
          results := Array.append(results, [res]);
        };
        ritualQueue := [];
        results;
      };
    };
  }
tags: [motoko, behavioral, command, actor-model]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command Hex turns a request into a stand-alone object containing all information about the imperative. The `Archmage` actor queues these incantations asynchronously without needing to immediately execute them, treating actions as data to be evaluated at the optimal astrological alignment.
