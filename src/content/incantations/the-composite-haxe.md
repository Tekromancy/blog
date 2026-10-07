---
title: The Composite
description: Treating single runes and massive arrays identically
type: haxe
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Fractalmancy"
formula: |2
  interface ISpellComponent {
      public function invoke():Void;
  }

  class BasicRune implements ISpellComponent {
      private var name:String;
      public function new(name:String) { this.name = name; }
      public function invoke():Void { trace('Invoking rune: $name'); }
  }

  class RuneCluster implements ISpellComponent {
      private var children:Array<ISpellComponent>;
      public function new() { this.children = []; }

      public function add(component:ISpellComponent):Void {
          this.children.push(component);
      }

      public function invoke():Void {
          trace("Invoking a cluster of runes:");
          for (child in children) {
              child.invoke();
          }
      }
  }
tags: [transmutation, composite, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Fractal runecrafting allows mages to group multiple runes into a cluster. Because both the single rune and the cluster implement `ISpellComponent`, the arcane interpreter can trigger them recursively without needing to parse their internal complexity.
