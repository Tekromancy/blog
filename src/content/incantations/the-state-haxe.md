---
title: The State
description: Altering behavior through shapeshifting paradigms
type: haxe
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Shapeshifting"
formula: |2
  interface IFormState {
      public function attack():Void;
      public function move():Void;
  }

  class HumanForm implements IFormState {
      public function new() {}
      public function attack():Void { trace("Striking with a sword."); }
      public function move():Void { trace("Walking on two legs."); }
  }

  class BearForm implements IFormState {
      public function new() {}
      public function attack():Void { trace("Mauling with claws."); }
      public function move():Void { trace("Lumbering on all fours."); }
  }

  class Druid {
      private var currentState:IFormState;

      public function new() {
          this.currentState = new HumanForm();
      }

      public function shift(state:IFormState):Void {
          this.currentState = state;
          trace("Druid shifted forms.");
      }

      public function act():Void {
          currentState.move();
          currentState.attack();
      }
  }
tags: [transmutation, state, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern is pure Shapeshifting. It allows an object to change its behavior dynamically when its internal state changes, making the object appear to change its entire class entirely. Haxe interfaces handle this elegantly for shifting behavior trees.
