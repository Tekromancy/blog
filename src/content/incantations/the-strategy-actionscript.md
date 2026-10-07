---
title: The Strategy
description: Swapping out the dark intelligence of a flash golem at runtime.
type: actionscript
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Cognitive Swapping"
formula: |2
  package arcana.strategy {

      public interface ICombatTactic {
          function execute(target:String):void;
      }

      public class BerserkTactic implements ICombatTactic {
          public function execute(target:String):void {
              trace("Swinging wildly at " + target + " with blinding rage!");
          }
      }

      public class StealthTactic implements ICombatTactic {
          public function execute(target:String):void {
              trace("Creeping up behind " + target + " to sever their spine.");
          }
      }

      public class FlashGolem {
          private var tactic:ICombatTactic;

          public function setTactic(t:ICombatTactic):void {
              this.tactic = t;
          }

          public function engage(target:String):void {
              if (tactic) {
                  tactic.execute(target);
              } else {
                  trace("Golem stands idle, waiting for instructions.");
              }
          }
      }
  }
tags: [strategy, actionscript, flash, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
