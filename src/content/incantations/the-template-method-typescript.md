---
title: The Template Method
description: Defining the skeleton of an incantation, deferring specific steps to subclasses.
type: typescript
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Structure"
formula: |2
  abstract class RitualCasting {
    // The Template Method
    public performRitual(): void {
      this.drawCircle();
      this.chant();
      this.releaseEnergy();
    }
    
    private drawCircle(): void {
      console.log("Drawing binding circle of chalk and salt.");
    }
    
    protected abstract chant(): void;
    protected abstract releaseEnergy(): void;
  }
  
  class DemonSummoning extends RitualCasting {
    protected chant(): void { console.log("Chanting abyssal verses."); }
    protected releaseEnergy(): void { console.log("Tearing a rift to the void!"); }
  }
tags: [behavioral, typescript, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method pattern defines the skeleton of an algorithm in an operation, deferring some steps to subclasses. It ensures the fundamental structure of a magic ritual—like drawing a circle before chanting—is invariant, while allowing specific traditions to implement their own dark verses and manifestations.
