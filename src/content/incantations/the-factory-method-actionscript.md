---
title: The Factory Method
description: Delegating the manifestation of Stage Phantoms to subordinate dark arts.
type: actionscript
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Macromedia Necromancy"
formula: |2
  package arcana.factorymethod {
      import flash.display.DisplayObject;
      import flash.display.Shape;
      import flash.display.Sprite;

      public class PhantomSpawner {
          // The Factory Method
          protected function conjurePhantom():DisplayObject {
              throw new Error("Abstract method: Must be overridden by a specific sub-cult.");
          }

          public function manifestOnStage():DisplayObject {
              var phantom:DisplayObject = conjurePhantom();
              trace("Binding " + phantom + " to the display list.");
              return phantom;
          }
      }

      public class SpriteSpawner extends PhantomSpawner {
          override protected function conjurePhantom():DisplayObject {
              trace("Summoning a Sprite Phantom from the AVM2.");
              return new Sprite();
          }
      }

      public class ShapeSpawner extends PhantomSpawner {
          override protected function conjurePhantom():DisplayObject {
              trace("Drawing a Shape Phantom with blood graphics.");
              var shape:Shape = new Shape();
              shape.graphics.beginFill(0x8B0000);
              shape.graphics.drawCircle(0, 0, 50);
              shape.graphics.endFill();
              return shape;
          }
      }
  }
tags: [factory-method, actionscript, flash, macromedia-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
