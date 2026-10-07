---
title: The Iterator
description: Traversing a graveyard of corrupted MovieClips without exposing their underlying array.
type: actionscript
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Safe Traversal"
formula: |2
  package arcana.iterator {

      public interface IIterator {
          function hasNext():Boolean;
          function next():Object;
      }

      public interface IGraveyard {
          function createIterator():IIterator;
      }

      public class TombIterator implements IIterator {
          private var corpses:Array;
          private var position:int = 0;

          public function TombIterator(corpses:Array) {
              this.corpses = corpses;
          }

          public function hasNext():Boolean {
              return position < corpses.length;
          }

          public function next():Object {
              var corpse:Object = corpses[position];
              position++;
              return corpse;
          }
      }

      public class PetCemetery implements IGraveyard {
          private var corpses:Array = ["ZombieDog", "SkeletalCat", "GhostParrot"];

          public function createIterator():IIterator {
              return new TombIterator(corpses);
          }
      }
  }
tags: [iterator, actionscript, flash, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
