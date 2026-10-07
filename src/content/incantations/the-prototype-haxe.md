---
title: The Prototype
description: Cloning magical essences without recompilation
type: haxe
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  interface ICloneable<T> {
      public function clone():T;
  }

  class Familiar implements ICloneable<Familiar> {
      public var species:String;
      public var powerLevel:Int;

      public function new(species:String, powerLevel:Int) {
          this.species = species;
          this.powerLevel = powerLevel;
      }

      public function clone():Familiar {
          // A deep copy of the familiar's astral form
          return new Familiar(this.species, this.powerLevel);
      }

      public function manifest():Void {
          trace('A $species familiar hums with power level $powerLevel.');
      }
  }

  class Summoner {
      public static function massSummon(baseFamiliar:Familiar, count:Int):Array<Familiar> {
          var swarm = new Array<Familiar>();
          for (i in 0...count) {
              swarm.push(baseFamiliar.clone());
          }
          return swarm;
      }
  }
tags: [illusion, prototype, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Why expend mana constructing a complex familiar from scratch when its astral template can simply be cloned? The Prototype pattern duplicates existing runic matrices, saving processing cycles across planes.
