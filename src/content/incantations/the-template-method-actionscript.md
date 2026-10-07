---
title: The Template Method
description: Defining the skeleton of a blood ritual, leaving specific steps to sub-cults.
type: actionscript
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Skeleton"
formula: |2
  package arcana.template {

      public class BaseRitual {
          // The Template Method
          public final function conductRitual():void {
              prepareCircle();
              chantIncantation();
              if (requiresSacrifice()) {
                  performSacrifice();
              }
              summonEntity();
          }

          private function prepareCircle():void {
              trace("Drawing the pentagram with crushed chalk.");
          }

          protected function chantIncantation():void {
              throw new Error("Must be overridden.");
          }

          protected function requiresSacrifice():Boolean {
              return true; // Default
          }

          protected function performSacrifice():void {
              throw new Error("Must be overridden if sacrifice is required.");
          }

          protected function summonEntity():void {
              trace("The entity emerges from the void.");
          }
      }

      public class FireDemonRitual extends BaseRitual {
          override protected function chantIncantation():void {
              trace("Chanting the words of the blazing inferno.");
          }

          override protected function performSacrifice():void {
              trace("Tossing a burning coal into the center.");
          }
      }
  }
tags: [template-method, actionscript, flash, rituals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
