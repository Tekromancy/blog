---
title: The Orthodox Template Method
description: Dictating the rigid skeleton of a holy ritual while deferring minor details to subclasses.
type: java
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Abjuration // Formalism"
formula: |2
  public abstract class EnterpriseRitual {

      // The Template Method itself is sealed
      public final void performRitual() {
          purifyEnvironment();
          chant();
          sealWards();
      }

      private void purifyEnvironment() {
          System.out.println("System GC invoked. Environment purified.");
      }

      protected abstract void chant();

      private void sealWards() {
          System.out.println("Enterprise firewalls re-engaged. Wards sealed.");
      }
  }

  public class DataMigrationRitual extends EnterpriseRitual {
      @Override
      protected void chant() {
          System.out.println("Intoning SQL queries across the vast databanks...");
      }
  }

  public class CacheEvictionRitual extends EnterpriseRitual {
      @Override
      protected void chant() {
          System.out.println("Commanding the ephemeral memory to release its grasp...");
      }
  }
tags: [template-method, inheritance, skeleton, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the high clerics decree a standardized process, deviating from the sequence is heresy. The **Template Method** forces conformity through strict inheritance. The base class defines the skeletal sequence of the algorithm and seals it with the `final` keyword.

In the `EnterpriseRitual`, the `performRitual()` method strictly dictates that purification must happen before the chant, and the wards must be sealed afterward. The sub-classes (`DataMigrationRitual`, `CacheEvictionRitual`) are only permitted to provide the specific implementation for the abstract `chant()`. The grand architecture remains perfectly, rigidly preserved.
