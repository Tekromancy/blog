---
title: The Decorator
description: Dynamically layering vile enchantments over a base ActionScript component.
type: actionscript
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Spell Layering"
formula: |2
  package arcana.decorator {

      public interface ISpellcaster {
          function cast():String;
      }

      public class BaseMage implements ISpellcaster {
          public function cast():String {
              return "Casting Magic Missile";
          }
      }

      public class MageDecorator implements ISpellcaster {
          protected var wrappee:ISpellcaster;

          public function MageDecorator(mage:ISpellcaster) {
              this.wrappee = mage;
          }

          public function cast():String {
              return wrappee.cast();
          }
      }

      public class BloodMagicDecorator extends MageDecorator {
          public function BloodMagicDecorator(mage:ISpellcaster) {
              super(mage);
          }

          override public function cast():String {
              return super.cast() + " ...infused with boiling blood!";
          }
      }

      public class VoidMagicDecorator extends MageDecorator {
          public function VoidMagicDecorator(mage:ISpellcaster) {
              super(mage);
          }

          override public function cast():String {
              return super.cast() + " ...echoing from the silent void!";
          }
      }
  }
tags: [decorator, actionscript, flash, spell-layering]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
