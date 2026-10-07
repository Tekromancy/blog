---
title: The Hive Mind
description: Treat individual spells and sprawling spell clusters uniformly.
type: dart
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm Intelligence"
formula: |2
  abstract class SpellComponent {
    void invoke();
  }

  class MinorHex implements SpellComponent {
    final String name;
    MinorHex(this.name);

    @override
    void invoke() => print('Casting $name.');
  }

  class SpellCluster implements SpellComponent {
    final List<SpellComponent> _children = [];

    void add(SpellComponent component) => _children.add(component);

    @override
    void invoke() {
      print('Invoking Spell Cluster...');
      for (var child in _children) {
        child.invoke();
      }
    }
  }

  void main() {
    final fire = MinorHex('Spark');
    final air = MinorHex('Breeze');

    final storm = SpellCluster();
    storm.add(fire);
    storm.add(air);

    final maelstrom = SpellCluster();
    maelstrom.add(storm);
    maelstrom.add(MinorHex('Void Ripple'));

    maelstrom.invoke();
  }
tags: [dart, composite, tree-structure, swarm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the depths of widget trees and spell matrices, you often need to treat a single leaf and an entire branch identically. The Hive Mind (Composite) lets you orchestrate sprawling hierarchical structures of invocations as if they were a single, unified entity.
