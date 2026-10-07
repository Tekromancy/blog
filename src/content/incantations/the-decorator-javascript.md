---
title: The Enchantment Decorator
description: Attach additional responsibilities to an artifact dynamically without modifying its core matrix.
type: javascript
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Enchantment // Augmentation
formula: |
  class BaseStaff {
    cast() { return 10; } // Base damage
    describe() { return "Wooden Staff"; }
  }
  
  class StaffDecorator {
    constructor(staff) { this.staff = staff; }
    cast() { return this.staff.cast(); }
    describe() { return this.staff.describe(); }
  }
  
  class FlamingStaff extends StaffDecorator {
    cast() { return this.staff.cast() + 15; }
    describe() { return this.staff.describe() + " of Fire"; }
  }
  
  class VenomousStaff extends StaffDecorator {
    cast() { return this.staff.cast() + 5; }
    describe() { return "Venomous " + this.staff.describe(); }
  }
  
  let myStaff = new BaseStaff();
  myStaff = new FlamingStaff(myStaff);
  myStaff = new VenomousStaff(myStaff);
  
  console.log(`${myStaff.describe()} deals ${myStaff.cast()} damage.`);
tags: [enchantment, augmentation, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Enchantment Decorator

Why reforge a staff from scratch when you can simply weave new enchantments onto it? The Decorator pattern stacks infinite magical properties without destroying the original artifact's essence.
