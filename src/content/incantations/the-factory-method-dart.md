---
title: The Familiar Summoning
description: Defer the instantiation of magical familiars to specialized subclasses.
type: dart
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  abstract class Familiar {
    void speak();
  }

  class CyberRaven implements Familiar {
    @override
    void speak() => print('Caw! 01100011');
  }

  class NeonCat implements Familiar {
    @override
    void speak() => print('Meow... *glitch*');
  }

  abstract class Summoner {
    Familiar summon(); // The Factory Method

    void commandFamiliar() {
      final familiar = summon();
      print('Commanding familiar:');
      familiar.speak();
    }
  }

  class HackerSummoner extends Summoner {
    @override
    Familiar summon() => CyberRaven();
  }

  class StreetMage extends Summoner {
    @override
    Familiar summon() => NeonCat();
  }

  void main() {
    Summoner mage = StreetMage();
    mage.commandFamiliar();
  }
tags: [dart, factory-method, summoning, familiar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rather than binding a specific demon to your soul directly, you create a summoning circle that specifies *how* a demon is summoned, allowing different covens to provide their own distinct entities. In Dart, this encapsulates object creation, saving UI layers from direct concrete class dependencies.
