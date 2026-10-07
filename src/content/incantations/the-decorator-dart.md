---
title: The Rune Weaver
description: Dynamically add mystical responsibilities to objects without altering their core essence.
type: dart
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  abstract class Spell {
    String get description;
    int get manaCost;
  }

  class BaseMissile implements Spell {
    @override
    String get description => 'Arcane Missile';

    @override
    int get manaCost => 10;
  }

  abstract class SpellDecorator implements Spell {
    final Spell spell;
    SpellDecorator(this.spell);
  }

  class EchoRune extends SpellDecorator {
    EchoRune(super.spell);

    @override
    String get description => '${spell.description} + Echo';

    @override
    int get manaCost => spell.manaCost + 5;
  }

  class VoidRune extends SpellDecorator {
    VoidRune(super.spell);

    @override
    String get description => '${spell.description} + Void Pierce';

    @override
    int get manaCost => spell.manaCost + 15;
  }

  void main() {
    Spell missile = BaseMissile();
    missile = EchoRune(missile);
    missile = VoidRune(missile);

    print('Spell: ${missile.description} (Cost: ${missile.manaCost})');
  }
tags: [dart, decorator, wrapper, enhancement]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than rewriting a spellbook every time you want to add a modifier, you simply wrap the incantation in Runes. The Decorator layers functionality infinitely, building complex behaviors at runtime without exploding the class hierarchy.
