---
title: The Visitor
description: Decoupling algorithmic operations from element structures
type: haxe
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral Projection"
formula: |2
  interface IVisitor {
      public function visitBeast(beast:Beast):Void;
      public function visitSpirit(spirit:Spirit):Void;
  }

  interface IElement {
      public function accept(v:IVisitor):Void;
  }

  class Beast implements IElement {
      public function new() {}
      public function accept(v:IVisitor):Void { v.visitBeast(this); }
  }

  class Spirit implements IElement {
      public function new() {}
      public function accept(v:IVisitor):Void { v.visitSpirit(this); }
  }

  class AuraScanner implements IVisitor {
      public function new() {}
      public function visitBeast(beast:Beast):Void {
          trace("Scanning Beast: detecting primal physical aura.");
      }
      public function visitSpirit(spirit:Spirit):Void {
          trace("Scanning Spirit: detecting ethereal psionic resonance.");
      }
  }
tags: [divination, visitor, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor allows a separate class to traverse and operate upon complex hierarchies without modifying the data structures themselves. It is akin to astral projection: the `AuraScanner` projects itself into various nodes, applying different logic depending on the material essence it encounters.
