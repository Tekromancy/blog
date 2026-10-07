---
title: The State
description: A shape-shifting abomination changing its behavior based on its internal mutation phase.
type: actionscript
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  package arcana.state {

      public interface IMutationPhase {
          function attack():void;
          function move():void;
      }

      public class LarvalPhase implements IMutationPhase {
          public function attack():void { trace("Larva bites weakly."); }
          public function move():void { trace("Larva crawls slowly."); }
      }

      public class ApexPhase implements IMutationPhase {
          public function attack():void { trace("Apex predator eviscerates target!"); }
          public function move():void { trace("Apex predator teleports through shadows."); }
      }

      public class Abomination {
          private var currentPhase:IMutationPhase;

          public function Abomination() {
              currentPhase = new LarvalPhase();
          }

          public function mutate():void {
              trace("The abomination mutates into its apex form!");
              currentPhase = new ApexPhase();
          }

          public function strike():void {
              currentPhase.attack();
          }

          public function traverse():void {
              currentPhase.move();
          }
      }
  }
tags: [state, actionscript, flash, mutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
