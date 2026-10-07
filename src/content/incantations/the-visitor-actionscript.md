---
title: The Visitor
description: Sending a spectral auditor through a complex taxonomy of stage demons without altering their code.
type: actionscript
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // External Auditing"
formula: |2
  package arcana.visitor {

      public interface IDemonVisitor {
          function visitImp(imp:Imp):void;
          function visitFiend(fiend:Fiend):void;
      }

      public interface IDemonicEntity {
          function accept(visitor:IDemonVisitor):void;
      }

      public class Imp implements IDemonicEntity {
          public var mischiefLevel:int = 10;
          public function accept(visitor:IDemonVisitor):void {
              visitor.visitImp(this);
          }
      }

      public class Fiend implements IDemonicEntity {
          public var hellfireIntensity:int = 5000;
          public function accept(visitor:IDemonVisitor):void {
              visitor.visitFiend(this);
          }
      }

      public class SoulReaperVisitor implements IDemonVisitor {
          public var totalSoulsHarvested:int = 0;

          public function visitImp(imp:Imp):void {
              trace("Reaping Imp. Small soul.");
              totalSoulsHarvested += 1;
          }

          public function visitFiend(fiend:Fiend):void {
              trace("Reaping Fiend. Massive soul.");
              totalSoulsHarvested += 10;
          }
      }
  }
tags: [visitor, actionscript, flash, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
