---
title: The Facade
description: Providing a simple interface to a maddening labyrinth of Flash subsystems.
type: actionscript
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplicity from Chaos"
formula: |2
  package arcana.facade {

      // The horrifying subsystems
      internal class SoulExtractor {
          public function tear():void { trace("Tearing soul from host."); }
      }
      internal class BloodRitual {
          public function boil():void { trace("Boiling blood for power."); }
      }
      internal class DemonSummoner {
          public function callForth():void { trace("Summoning a demon of the 7th frame."); }
      }

      // The Facade
      public class DarkArtsFacade {
          private var extractor:SoulExtractor;
          private var ritual:BloodRitual;
          private var summoner:DemonSummoner;

          public function DarkArtsFacade() {
              extractor = new SoulExtractor();
              ritual = new BloodRitual();
              summoner = new DemonSummoner();
          }

          public function executeGrandSacrifice():void {
              trace("Commencing the Grand Sacrifice...");
              extractor.tear();
              ritual.boil();
              summoner.callForth();
              trace("Grand Sacrifice complete. The stage is dark.");
          }
      }
  }
tags: [facade, actionscript, flash, subsystem-hiding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
