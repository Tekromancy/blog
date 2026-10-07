---
title: The Flyweight
description: Conserving precious AVM2 memory by sharing intrinsic state among a swarm of locusts.
type: actionscript
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory Optimization"
formula: |2
  package arcana.flyweight {
      import flash.display.BitmapData;
      import flash.geom.Point;

      // Intrinsic State (Shared)
      public class LocustSprite {
          public var bitmapData:BitmapData;

          public function LocustSprite() {
              // A massive horrific bitmap loaded once
              bitmapData = new BitmapData(32, 32, true, 0xFF000000);
          }
      }

      // The Factory
      public class SwarmFactory {
          private var sharedLocust:LocustSprite;

          public function getLocustSprite():LocustSprite {
              if (!sharedLocust) {
                  sharedLocust = new LocustSprite();
                  trace("Forged the original locust template.");
              }
              return sharedLocust;
          }
      }

      // Extrinsic State (Unique)
      public class SwarmLocust {
          private var sprite:LocustSprite;
          public var x:Number;
          public var y:Number;

          public function SwarmLocust(sprite:LocustSprite, x:Number, y:Number) {
              this.sprite = sprite;
              this.x = x;
              this.y = y;
          }

          public function render():void {
              // Would draw sprite.bitmapData at x, y using copyPixels
              trace("Drawing locust at " + x + ", " + y);
          }
      }
  }
tags: [flyweight, actionscript, flash, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
