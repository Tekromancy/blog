---
title: The Memento
description: Preserving the state of a deteriorating mind in a crystal shard, to restore it when madness takes over.
type: actionscript
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Abjuration // State Preservation"
formula: |2
  package arcana.memento {

      public class CrystalShard {
          private var _savedSanity:int;

          public function CrystalShard(sanity:int) {
              this._savedSanity = sanity;
          }

          public function get sanity():int {
              return _savedSanity;
          }
      }

      public class WarlockMind {
          private var sanityLevel:int;

          public function WarlockMind() {
              this.sanityLevel = 100;
          }

          public function sufferTrauma(amount:int):void {
              sanityLevel -= amount;
              trace("Trauma suffered. Sanity now at: " + sanityLevel);
          }

          public function preserveInCrystal():CrystalShard {
              trace("Preserving sanity in crystal shard.");
              return new CrystalShard(sanityLevel);
          }

          public function restoreFromCrystal(shard:CrystalShard):void {
              sanityLevel = shard.sanity;
              trace("Sanity restored from crystal. Sanity now at: " + sanityLevel);
          }
      }
  }
tags: [memento, actionscript, flash, state-saving]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
