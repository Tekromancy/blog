---
title: The Chain of Responsibility
description: Passing a cursed artifact along a hierarchy of dark priests until one can bear its weight.
type: actionscript
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Command Delegation"
formula: |2
  package arcana.chain {

      public class CursedArtifact {
          public var maliceLevel:int;
          public function CursedArtifact(malice:int) {
              this.maliceLevel = malice;
          }
      }

      public class Priest {
          private var nextPriest:Priest;
          private var tolerance:int;
          private var title:String;

          public function Priest(title:String, tolerance:int) {
              this.title = title;
              this.tolerance = tolerance;
          }

          public function setNext(priest:Priest):void {
              this.nextPriest = priest;
          }

          public function handleArtifact(artifact:CursedArtifact):void {
              if (artifact.maliceLevel <= tolerance) {
                  trace(title + " successfully contains the artifact.");
              } else if (nextPriest != null) {
                  trace(title + " cannot bear it. Passing to next...");
                  nextPriest.handleArtifact(artifact);
              } else {
                  trace("No priest could contain it. The artifact destroys the order.");
              }
          }
      }
  }
tags: [chain-of-responsibility, actionscript, flash, handlers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
