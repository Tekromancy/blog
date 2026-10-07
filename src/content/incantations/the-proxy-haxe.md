---
title: The Proxy
description: Guarding forbidden grimoires with a spectral sentinel
type: haxe
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  interface IGrimoire {
      public function readSecret():Void;
  }

  class ForbiddenGrimoire implements IGrimoire {
      public function new() {}
      public function readSecret():Void {
          trace("Revealing the dark truth of the universe...");
      }
  }

  class GrimoireProxy implements IGrimoire {
      private var grimoire:ForbiddenGrimoire;
      private var userRank:Int;

      public function new(rank:Int) {
          this.userRank = rank;
      }

      public function readSecret():Void {
          if (this.userRank >= 10) {
              if (this.grimoire == null) {
                  this.grimoire = new ForbiddenGrimoire();
              }
              this.grimoire.readSecret();
          } else {
              trace("Access Denied: Arcane rank too low to read this tome.");
          }
      }
  }
tags: [abjuration, proxy, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy stands as a guardian between the chaotic void and the user. It delays the materialization of the heavy `ForbiddenGrimoire` until absolutely necessary, and verifies the mage's credentials before granting access to cross-realm memory structures.
