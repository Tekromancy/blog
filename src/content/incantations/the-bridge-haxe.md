---
title: The Bridge
description: Decoupling the magical abstraction from its planar implementation
type: haxe
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Realm Decoupling"
formula: |2
  interface IPlaneRenderer {
      public function renderSigil(name:String):Void;
  }

  class JSPlaneRenderer implements IPlaneRenderer {
      public function new() {}
      public function renderSigil(name:String):Void {
          trace('Rendering $name via Canvas in the JS realm.');
      }
  }

  class CPPPlaneRenderer implements IPlaneRenderer {
      public function new() {}
      public function renderSigil(name:String):Void {
          trace('Rendering $name via OpenGL in the C++ realm.');
      }
  }

  abstract class SpellVisual {
      private var renderer:IPlaneRenderer;
      public function new(renderer:IPlaneRenderer) {
          this.renderer = renderer;
      }
      public abstract function materialize():Void;
  }

  class Fire SigilVisual extends SpellVisual {
      public function materialize():Void {
          this.renderer.renderSigil("Flame Burst");
      }
  }
tags: [transmutation, bridge, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern separates the abstract spell from its concrete planar rendering. Haxe excels at this, allowing Write Once Runes to manifest via HTML5 canvas, C++ OpenGL, or even terminal ASCII, just by switching the implementation bridge.
