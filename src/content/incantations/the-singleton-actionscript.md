---
title: The Singleton
description: Ensuring only one dark Overlord exists in the AVM2 instance.
type: actionscript
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // State Monopoly"
formula: |2
  package arcana.singleton {

      public class StageOverlord {
          private static var _instance:StageOverlord;
          private static var _allowInstantiation:Boolean = false;

          public var darkAuraRadius:Number = 666.0;

          public function StageOverlord() {
              if (!_allowInstantiation) {
                  throw new Error("Direct instantiation forbidden. Use StageOverlord.getInstance().");
              }
              trace("The Stage Overlord has awakened.");
          }

          public static function getInstance():StageOverlord {
              if (_instance == null) {
                  _allowInstantiation = true;
                  _instance = new StageOverlord();
                  _allowInstantiation = false;
              }
              return _instance;
          }

          public function corruptStage():void {
              trace("The stage is now corrupted by the Overlord's presence.");
          }
      }
  }
tags: [singleton, actionscript, flash, overlord]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
