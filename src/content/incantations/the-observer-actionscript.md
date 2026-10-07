---
title: The Observer
description: The classic flash EventDispatcher, binding cultists to a central sacrificial altar.
type: actionscript
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Event Binding"
formula: |2
  package arcana.observer {
      import flash.events.Event;
      import flash.events.EventDispatcher;

      public class SacrificeEvent extends Event {
          public static const SACRIFICE_MADE:String = "sacrificeMade";
          public var bloodLiters:Number;

          public function SacrificeEvent(type:String, blood:Number) {
              super(type);
              this.bloodLiters = blood;
          }
      }

      public class Altar extends EventDispatcher {
          public function performSacrifice(blood:Number):void {
              trace("A sacrifice of " + blood + " liters is made on the altar.");
              dispatchEvent(new SacrificeEvent(SacrificeEvent.SACRIFICE_MADE, blood));
          }
      }

      public class Cultist {
          private var name:String;

          public function Cultist(name:String, altar:Altar) {
              this.name = name;
              altar.addEventListener(SacrificeEvent.SACRIFICE_MADE, onSacrifice);
          }

          private function onSacrifice(e:SacrificeEvent):void {
              trace(name + " rejoices! The altar flows with " + e.bloodLiters + " liters of blood.");
          }
      }
  }
tags: [observer, actionscript, flash, event-dispatcher]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
