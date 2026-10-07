---
title: The Soul Sliver
description: Share mystical essence efficiently across massive swarms of objects.
type: dart
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Enchantment // Essence Duplication
formula: |
  class ParticleEssence {
    final String color;
    final String texture;
    ParticleEssence(this.color, this.texture);
  }
  
  class EssenceFactory {
    static final Map<String, ParticleEssence> _cache = {};
    
    static ParticleEssence getEssence(String color, String texture) {
      final key = '$color-$texture';
      if (!_cache.containsKey(key)) {
        _cache[key] = ParticleEssence(color, texture);
      }
      return _cache[key]!;
    }
  }
  
  class SpellParticle {
    final ParticleEssence essence;
    final double x, y;
    
    SpellParticle(this.essence, this.x, this.y);
    
    void render() => print('Rendering ${essence.color} particle at $x, $y');
  }
  
  void main() {
    final p1 = SpellParticle(EssenceFactory.getEssence('Red', 'Spark'), 10, 20);
    final p2 = SpellParticle(EssenceFactory.getEssence('Red', 'Spark'), 15, 25);
    
    print('Sharing same essence memory: ${identical(p1.essence, p2.essence)}');
  }
tags: [dart, flyweight, optimization, memory-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When conjuring a billion sparks in a spell effect, assigning unique memory to every spark's texture will drain your mana pool (RAM) instantly. The Flyweight extracts the intrinsic, shared state and allows thousands of entities to drink from the exact same essence vial.
