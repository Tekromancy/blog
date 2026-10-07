---
title: The Iterator
description: Traversing boundless dimensions sequentially
type: haxe
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  class AstralPlane {
      private var entities:Array<String>;
      public function new() { entities = ["Spirit", "Wisp", "Phantom"]; }

      // Haxe has built-in iterator support via `iterator()`
      public function iterator():Iterator<String> {
          return new PlaneIterator(this.entities);
      }
  }

  class PlaneIterator {
      private var collection:Array<String>;
      private var index:Int = 0;

      public function new(collection:Array<String>) {
          this.collection = collection;
      }

      public function hasNext():Bool {
          return index < collection.length;
      }

      public function next():String {
          return collection[index++];
      }
  }

  class Scryer {
      public static function scan() {
          var plane = new AstralPlane();
          for (entity in plane) {
              trace('Scried entity: $entity');
          }
      }
  }
tags: [divination, iterator, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Sequential traversal of astral nodes requires a standardized interface. Haxe beautifully integrates the Iterator pattern directly into its core syntax. Implementing `hasNext()` and `next()` permits usage within standard `for ... in` loops, abstracting away the complex dimensional geometry.
