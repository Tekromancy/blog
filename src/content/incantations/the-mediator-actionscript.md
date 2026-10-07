---
title: The Mediator
description: A dark pact that forces disparate timeline entities to communicate only through a central Overseer.
type: actionscript
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Centralized Control"
formula: |2
  package arcana.mediator {

      public interface IBloodPact {
          function relayScream(sender:CursedEntity, message:String):void;
      }

      public class CentralOverseer implements IBloodPact {
          private var entities:Vector.<CursedEntity> = new Vector.<CursedEntity>();

          public function register(entity:CursedEntity):void {
              entities.push(entity);
              entity.bindPact(this);
          }

          public function relayScream(sender:CursedEntity, message:String):void {
              for each (var entity:CursedEntity in entities) {
                  if (entity != sender) {
                      entity.receiveScream(message);
                  }
              }
          }
      }

      public class CursedEntity {
          protected var pact:IBloodPact;
          public var name:String;

          public function CursedEntity(name:String) {
              this.name = name;
          }

          public function bindPact(pact:IBloodPact):void {
              this.pact = pact;
          }

          public function scream(message:String):void {
              trace(name + " screams: " + message);
              pact.relayScream(this, message);
          }

          public function receiveScream(message:String):void {
              trace(name + " hears the scream: " + message);
          }
      }
  }
tags: [mediator, actionscript, flash, overseer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
