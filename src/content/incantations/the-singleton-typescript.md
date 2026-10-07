---
title: The Singleton
description: Guaranteeing a singular, universal locus of control across the arcane network.
type: typescript
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Leyline Control"
formula: |2
  class LeylineNexus {
    private static instance: LeylineNexus;
    public manaReserves: number;
    
    private constructor() {
      this.manaReserves = 10000;
    }
    
    public static getInstance(): LeylineNexus {
      if (!LeylineNexus.instance) {
        LeylineNexus.instance = new LeylineNexus();
      }
      return LeylineNexus.instance;
    }
    
    public tapMana(amount: number): void {
      this.manaReserves -= amount;
    }
  }
tags: [creational, typescript, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Singleton pattern ensures a class only has one instance, providing a global point of access to it. Perfect for managing a singular resource like the central Leyline Nexus or an application's root registry of spell effects, ensuring multiple mages don't disrupt the shared state.
