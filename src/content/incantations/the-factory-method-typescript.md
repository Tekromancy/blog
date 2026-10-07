---
title: The Factory Method
description: Delegating the instantiation of spells to localized subnetworks of magical subclasses.
type: typescript
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Invocation"
formula: |2
  interface Spell {
    cast(): string;
  }
  
  class Fireball implements Spell {
    cast() { return "A blazing sphere of network traffic erupts!"; }
  }
  
  abstract class Spellweaver {
    abstract createSpell(): Spell;
    
    invoke(): string {
      const spell = this.createSpell();
      return spell.cast();
    }
  }
  
  class PyromancerWeaver extends Spellweaver {
    createSpell(): Spell {
      return new Fireball();
    }
  }
tags: [creational, typescript, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method defines an interface for summoning an object, but leaves the choice of its type to the subclasses. This is the bedrock of polymorphic incantations, allowing a generic casting sequence to manifest dynamic, context-specific spell logic through strict type constraints.
