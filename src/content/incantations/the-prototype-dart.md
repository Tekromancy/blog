---
title: The Doppelganger Hex
description: Clone complex magical state instead of reconstructing it from scratch.
type: dart
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Shadow Duplication"
formula: |2
  abstract class Cloneable<T> {
    T clone();
  }

  class ShadowClone implements Cloneable<ShadowClone> {
    String weapon;
    int chakraLevel;

    ShadowClone(this.weapon, this.chakraLevel);

    ShadowClone._copy(ShadowClone original)
        : weapon = original.weapon,
            chakraLevel = original.chakraLevel;

    @override
    ShadowClone clone() => ShadowClone._copy(this);

    void display() => print('Clone armed with $weapon, Chakra: $chakraLevel');
  }

  void main() {
    final original = ShadowClone('Kunai', 100);
    final army = List.generate(5, (_) => original.clone());

    army[0].weapon = 'Shuriken'; // Modify one clone independently

    for (var clone in army) {
      clone.display();
    }
  }
tags: [dart, prototype, cloning, illusion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Why spend the mana to invoke an entity from the ether when you can perfectly mirror one that already exists? The Prototype pattern allows Dart spellcasters to duplicate complex objects efficiently. In Flutter, this is heavily used as the `copyWith` pattern for immutable state.
