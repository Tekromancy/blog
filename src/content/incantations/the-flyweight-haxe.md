---
title: The Flyweight
description: Conserving memory through shared planar signatures
type: haxe
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  class ElementalRune {
      public var element(default, null):String;
      public var color(default, null):String;

      public function new(element:String, color:String) {
          this.element = element;
          this.color = color;
      }

      public function display(x:Int, y:Int):Void {
          trace('Displaying $color $element rune at ($x, $y)');
      }
  }

  class RuneFactory {
      private var cache:Map<String, ElementalRune>;

      public function new() {
          cache = new Map<String, ElementalRune>();
      }

      public function getRune(element:String, color:String):ElementalRune {
          var key = element + "_" + color;
          if (!cache.exists(key)) {
              cache.set(key, new ElementalRune(element, color));
              trace('Materializing new intrinsic rune: $key');
          }
          return cache.get(key);
      }
  }
tags: [transmutation, flyweight, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a grand ritual demands thousands of floating runes, manifesting each object individually devours system memory. The Flyweight shares intrinsic states (like the element and color) across a unified cache, leaving only extrinsic coordinates to vary. Perfect for low-memory planar projections.
