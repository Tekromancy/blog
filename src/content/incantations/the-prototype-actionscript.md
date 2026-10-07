---
title: The Prototype
description: Cloning entities from the ByteArray crypt to rapidly populate the display list.
type: actionscript
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Necromancy // Object Cloning"
formula: |2
  package arcana.prototype {
      import flash.utils.ByteArray;

      public interface ICloneableSoul {
          function clone():ICloneableSoul;
      }

      public class CursedMemoryFragment implements ICloneableSoul {
          public var memoryName:String;
          public var traumaLevel:int;

          public function CursedMemoryFragment(name:String, trauma:int) {
              this.memoryName = name;
              this.traumaLevel = trauma;
          }

          public function clone():ICloneableSoul {
              // Using ByteArray deep cloning - a classic ActionScript necromancy technique
              var crypt:ByteArray = new ByteArray();
              crypt.writeObject(this);
              crypt.position = 0;
              var resurrected:CursedMemoryFragment = crypt.readObject() as CursedMemoryFragment;

              trace("Cloned memory fragment: " + resurrected.memoryName);
              return resurrected;
          }
      }
  }
tags: [prototype, actionscript, flash, bytearray-cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
