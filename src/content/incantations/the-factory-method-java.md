---
title: The Sanctioned Factory Method
description: Delegating the dark art of instantiation to the holy subclasses of the Cathedral.
type: java
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Delegation"
formula: |2
  public abstract class SpellCaster {
      public void cast() {
          Spell spell = createSpell();
          spell.ignite();
      }

      protected abstract Spell createSpell();
  }

  public interface Spell {
      void ignite();
  }

  public class HellfireSpell implements Spell {
      @Override
      public void ignite() {
          System.out.println("Sanctioned Hellfire deployed.");
      }
  }

  public class Inquisitor extends SpellCaster {
      @Override
      protected Spell createSpell() {
          return new HellfireSpell();
      }
  }
tags: [factory, delegation, polymorphism, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Within the high-walled courtyards of the Java Cathedral, direct instantiation via the `new` operator is often seen as a crude, unstructured rebellion. The **Factory Method** provides a holy layer of indirection, placing the burden of creation onto sanctioned subclasses.

By invoking the abstract `createSpell()` within the templated `cast()` method, the base `SpellCaster` class maintains absolute control over the ritual flow, while allowing the exact nature of the `Spell` to be decided by the specific sect or order (such as the `Inquisitor`). This rigid hierarchy allows the enterprise to scale its magical operations without polluting the core dogma with concrete implementations.
