---
title: The Ritual Blueprint
description: Define the skeleton of an algorithm, deferring exact steps to subclasses.
type: dart
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Ritual Animation
formula: |
  abstract class NecromanticRitual {
    // The Template Method
    void performRitual() {
      gatherMaterials();
      drawCircle();
      chant();
      awakenEntity();
    }
    
    void gatherMaterials() => print('Gathering bone and ash.');
    void drawCircle() => print('Drawing a pentagram.');
    
    // Hook methods deferred to subclasses
    void chant();
    void awakenEntity();
  }
  
  class SkeletonRitual extends NecromanticRitual {
    @override
    void chant() => print('Chanting in low clicks and clacks.');
    @override
    void awakenEntity() => print('A skeleton rises!');
  }
  
  void main() {
    final ritual = SkeletonRitual();
    ritual.performRitual();
  }
tags: [dart, template-method, inheritance, ritual]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Every grand ritual follows a specific, unalterable sequence of events—gather, draw, chant, awaken. The Template Method defines the immovable skeletal structure of the algorithm in the base class, while allowing subclasses to overwrite the specific magical hooks.
