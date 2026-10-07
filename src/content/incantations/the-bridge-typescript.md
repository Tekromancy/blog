---
title: The Bridge
description: Decoupling an abstraction from its implementation so both can vary independently.
type: typescript
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  interface SpellEffect {
    ignite(): string;
  }
  
  class PlasmaEffect implements SpellEffect {
    ignite() { return "Igniting super-heated plasma!"; }
  }
  
  abstract class Wand {
    protected effect: SpellEffect;
    
    constructor(effect: SpellEffect) {
      this.effect = effect;
    }
    
    abstract wave(): string;
  }
  
  class ChromiumWand extends Wand {
    wave() {
      return `Chromium Wand shines: ${this.effect.ignite()}`;
    }
  }
tags: [structural, typescript, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Bridge pattern decouples an abstraction from its implementation. By splitting the magic focus (the Wand) from the elemental result (the SpellEffect), mages can pair any material conduit with any energy signature without creating an exponential number of specific wand classes.
