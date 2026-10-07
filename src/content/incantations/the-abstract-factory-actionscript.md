---
title: The Abstract Factory
description: A necromantic factory for summoning families of Flash Golems and Stage Phantoms.
type: actionscript
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Macromedia Necromancy"
formula: |2
  package arcana.factories {
      import flash.display.Sprite;

      public interface IGolemFactory {
          function createWarrior():Sprite;
          function createMage():Sprite;
      }

      public class BoneGolemFactory implements IGolemFactory {
          public function createWarrior():Sprite {
              trace("Summoning a warrior of calcified flash memory.");
              return new BoneWarrior();
          }
          public function createMage():Sprite {
              trace("Raising a bone-mage from the deprecated timeline.");
              return new BoneMage();
          }
      }

      public class SpectralGolemFactory implements IGolemFactory {
          public function createWarrior():Sprite {
              trace("Evoking a spectral warrior from the AVM2 abyss.");
              return new SpectralWarrior();
          }
          public function createMage():Sprite {
              trace("Binding a phantom mage to the stage.");
              return new SpectralMage();
          }
      }

      internal class BoneWarrior extends Sprite {}
      internal class BoneMage extends Sprite {}
      internal class SpectralWarrior extends Sprite {}
      internal class SpectralMage extends Sprite {}
  }
tags: [abstract-factory, actionscript, flash, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
