---
title: The Proxy
description: A spectral stand-in for an abyssal entity that is too heavy to summon immediately.
type: actionscript
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Deferred Summoning"
formula: |2
  package arcana.proxy {

      public interface IDemon {
          function unleash():void;
      }

      public class BehemothDemon implements IDemon {
          public function BehemothDemon() {
              trace("Heavy loading... Summoning the Behemoth from the void (Takes 10 seconds).");
              // Imagine heavy asset loading here
          }

          public function unleash():void {
              trace("The Behemoth crushes the stage!");
          }
      }

      public class BehemothProxy implements IDemon {
          private var realDemon:BehemothDemon;

          public function unleash():void {
              if (realDemon == null) {
                  trace("Proxy: Initializing the real Behemoth only when needed.");
                  realDemon = new BehemothDemon();
              }
              realDemon.unleash();
          }
      }
  }
tags: [proxy, actionscript, flash, deferred-loading]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
