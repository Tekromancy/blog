---
title: The Bridge
description: Decoupling the phantom's visual essence from its timeline behavior.
type: actionscript
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Illusion // Decoupling"
formula: |2
  package arcana.bridge {
      import flash.display.Sprite;

      // Implementor
      public interface IPhantomRenderer {
          function render(target:Sprite):void;
      }

      public class EtherealRenderer implements IPhantomRenderer {
          public function render(target:Sprite):void {
              target.alpha = 0.3;
              target.blendMode = "add";
              trace("Rendered ethereal phantom.");
          }
      }

      public class ShadowRenderer implements IPhantomRenderer {
          public function render(target:Sprite):void {
              target.alpha = 0.8;
              target.blendMode = "multiply";
              trace("Rendered shadow phantom.");
          }
      }

      // Abstraction
      public class Poltergeist extends Sprite {
          protected var renderer:IPhantomRenderer;

          public function Poltergeist(renderer:IPhantomRenderer) {
              this.renderer = renderer;
          }

          public function manifest():void {
              renderer.render(this);
          }
      }

      public class VengefulPoltergeist extends Poltergeist {
          public function VengefulPoltergeist(renderer:IPhantomRenderer) {
              super(renderer);
          }

          override public function manifest():void {
              super.manifest();
              this.scaleX = this.scaleY = 2.0;
              trace("The vengeance expands its form!");
          }
      }
  }
tags: [bridge, actionscript, flash, rendering]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
