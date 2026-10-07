---
title: The Builder
description: Step-by-step construction of complex runic constructs
type: haxe
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Runic Assembly"
formula: |2
  class Golem {
      public var material:String;
      public var core:String;
      public var runes:Array<String>;

      public function new() {
          this.runes = [];
      }

      public function describe():Void {
          trace('A $material golem powered by a $core core, inscribed with: ' + runes.join(", "));
      }
  }

  interface IGolemBuilder {
      public function setMaterial(m:String):IGolemBuilder;
      public function setCore(c:String):IGolemBuilder;
      public function addRune(r:String):IGolemBuilder;
      public function build():Golem;
  }

  class ClayGolemBuilder implements IGolemBuilder {
      private var golem:Golem;

      public function new() {
          this.reset();
      }

      public function reset():Void {
          this.golem = new Golem();
      }

      public function setMaterial(m:String):IGolemBuilder {
          this.golem.material = m;
          return this;
      }

      public function setCore(c:String):IGolemBuilder {
          this.golem.core = c;
          return this;
      }

      public function addRune(r:String):IGolemBuilder {
          this.golem.runes.push(r);
          return this;
      }

      public function build():Golem {
          var result = this.golem;
          this.reset();
          return result;
      }
  }
tags: [conjuration, builder, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder allows us to step through the intricate rituals of golem-crafting. Rather than a chaotic, monolithic incantation, we chain our runes methodically. By returning the builder instance, we achieve fluid rune-chaining in our cross-realm assemblies.
