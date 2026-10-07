---
title: The Flyweight
description: Using sharing to support large numbers of fine-grained magic particles efficiently.
type: typescript
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm Control"
formula: |2
  class RuneTexture {
    constructor(public glyphCode: string) {} // Intrinsic state
  }
  
  class RuneFactory {
    private cache: Map<string, RuneTexture> = new Map();
    getTexture(code: string): RuneTexture {
      if (!this.cache.has(code)) {
        this.cache.set(code, new RuneTexture(code));
      }
      return this.cache.get(code)!;
    }
  }
  
  class FloatingRune {
    constructor(private texture: RuneTexture, private x: number, private y: number) {} // Extrinsic state
    draw() { console.log(`Drawing ${this.texture.glyphCode} at ${this.x},${this.y}`); }
  }
tags: [structural, typescript, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Flyweight pattern minimizes memory usage by sharing as much data as possible with similar objects. When summoning a swarm of ten thousand protective runes, storing the intrinsic visual data in a single shared texture prevents a catastrophic memory overload within the arcane processor.
