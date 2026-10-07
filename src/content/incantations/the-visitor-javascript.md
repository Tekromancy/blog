---
title: The Auditor Visitor
description: Represent an operation to be performed on the elements of an object structure without changing their classes.
type: javascript
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Aura Reading
formula: |
  class Artifact { accept(visitor) {} }
  
  class Sword extends Artifact {
    accept(visitor) { visitor.visitSword(this); }
  }
  
  class Shield extends Artifact {
    accept(visitor) { visitor.visitShield(this); }
  }
  
  class EnchantmentChecker {
    visitSword(sword) { console.log("Sword aura: Sharpness +2"); }
    visitShield(shield) { console.log("Shield aura: Magic Resistance"); }
  }
  
  const sword = new Sword();
  const shield = new Shield();
  const checker = new EnchantmentChecker();
  
  sword.accept(checker);
  shield.accept(checker);
tags: [operations, structures, scanning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Auditor Visitor

When an Inquisitor inspects your armory, they don't alter your weapons; they merely observe and react. The Visitor pattern separates an algorithm from the object structure on which it operates.
