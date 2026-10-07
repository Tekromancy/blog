---
title: The Composite
description: Treating a tree of display objects as a single eldritch entity.
type: actionscript
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Hierarchical Horror"
formula: |2
  package arcana.composite {

      public interface IDisplayEntity {
          function renderTorment():void;
      }

      public class CursedLimb implements IDisplayEntity {
          private var name:String;

          public function CursedLimb(name:String) {
              this.name = name;
          }

          public function renderTorment():void {
              trace("Twitching limb: " + name);
          }
      }

      public class Amalgamation implements IDisplayEntity {
          private var name:String;
          private var children:Vector.<IDisplayEntity>;

          public function Amalgamation(name:String) {
              this.name = name;
              this.children = new Vector.<IDisplayEntity>();
          }

          public function absorb(entity:IDisplayEntity):void {
              children.push(entity);
          }

          public function renderTorment():void {
              trace("The amalgamation " + name + " groans. Its parts move:");
              for each (var child:IDisplayEntity in children) {
                  child.renderTorment();
              }
          }
      }
  }
tags: [composite, actionscript, flash, tree-structure]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
