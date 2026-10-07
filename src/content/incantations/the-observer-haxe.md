---
title: The Observer
description: Subscribing to dimensional shifts via event streams
type: haxe
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  interface IObserver {
      public function update(manaLevel:Int):Void;
  }

  class MoonWell {
      private var observers:Array<IObserver> = [];
      private var mana:Int = 0;

      public function new() {}

      public function attach(o:IObserver):Void {
          observers.push(o);
      }

      public function setMana(level:Int):Void {
          this.mana = level;
          notifyAll();
      }

      private function notifyAll():Void {
          for (obs in observers) obs.update(this.mana);
      }
  }

  class ElvenMage implements IObserver {
      private var name:String;
      public function new(name:String) { this.name = name; }

      public function update(manaLevel:Int):Void {
          trace('$name senses the well mana shifting to $manaLevel');
      }
  }
tags: [divination, observer, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Observer is the quintessential scrying mechanism. Instead of constantly polling the dimensional well for updates, interested mages simply register their signature. When the well surges, it pulses the data to all registered entities simultaneously.
