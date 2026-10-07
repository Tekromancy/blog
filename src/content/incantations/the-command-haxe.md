---
title: The Command
description: Encapsulating incantations for delayed execution
type: haxe
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delayed Triggers"
formula: |2
  interface IIncantation {
      public function execute():Void;
      public function undo():Void;
  }

  class Leyline {
      public var active:Bool = false;
      public function new() {}
      public function activate():Void { active = true; trace("Leyline glowing."); }
      public function deactivate():Void { active = false; trace("Leyline dark."); }
  }

  class ToggleLeylineCommand implements IIncantation {
      private var leyline:Leyline;
      public function new(leyline:Leyline) { this.leyline = leyline; }

      public function execute():Void { this.leyline.activate(); }
      public function undo():Void { this.leyline.deactivate(); }
  }

  class RitualMaster {
      private var history:Array<IIncantation> = [];
      public function new() {}

      public function cast(incantation:IIncantation):Void {
          incantation.execute();
          history.push(incantation);
      }

      public function rollback():Void {
          var last = history.pop();
          if (last != null) last.undo();
      }
  }
tags: [enchantment, command, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command turns a spell into a tangible object, decoupling the entity that invokes the spell from the one that executes it. This delayed binding is crucial for queued rituals, rollback scenarios (undoing catastrophic backfires), and scheduling macro-spells.
