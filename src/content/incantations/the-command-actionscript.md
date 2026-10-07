---
title: The Command
description: Encapsulating a profane request as an object, allowing for delays or undoing dark rites.
type: actionscript
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Action Encapsulation"
formula: |2
  package arcana.command {

      public interface IDarkRite {
          function execute():void;
          function undo():void;
      }

      public class StageCorrupter {
          public function darken():void { trace("Stage darkened."); }
          public function lighten():void { trace("Stage light restored."); }
      }

      public class CorruptStageRite implements IDarkRite {
          private var corrupter:StageCorrupter;

          public function CorruptStageRite(c:StageCorrupter) {
              this.corrupter = c;
          }

          public function execute():void {
              corrupter.darken();
          }

          public function undo():void {
              corrupter.lighten();
          }
      }

      public class Invoker {
          private var history:Vector.<IDarkRite> = new Vector.<IDarkRite>();

          public function castRite(rite:IDarkRite):void {
              rite.execute();
              history.push(rite);
          }

          public function repent():void {
              if (history.length > 0) {
                  var rite:IDarkRite = history.pop();
                  rite.undo();
              }
          }
      }
  }
tags: [command, actionscript, flash, undo-redo]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
