---
title: The Sanctified Decorator
description: Wrapping spells in recursive layers of holy bureaucratic validations.
type: java
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  public interface Liturgy {
      void execute();
  }

  public class BaseLiturgy implements Liturgy {
      @Override
      public void execute() {
          System.out.println("Executing the core liturgy.");
      }
  }

  public abstract class LiturgyDecorator implements Liturgy {
      protected final Liturgy wrappedLiturgy;

      public LiturgyDecorator(Liturgy wrappedLiturgy) {
          this.wrappedLiturgy = wrappedLiturgy;
      }

      @Override
      public void execute() {
          wrappedLiturgy.execute();
      }
  }

  public class AuditingDecorator extends LiturgyDecorator {
      public AuditingDecorator(Liturgy wrappedLiturgy) {
          super(wrappedLiturgy);
      }

      @Override
      public void execute() {
          System.out.println("[Audit Log] Liturgy execution initiated.");
          super.execute();
          System.out.println("[Audit Log] Liturgy execution completed successfully.");
      }
  }
tags: [decorator, composition, wrapper, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a raw spell is insufficient for the strict compliance standards of the Java Cathedral, sub-classing for every possible modification leads to chaotic proliferation. The **Decorator** pattern embraces composition over inheritance, wrapping a base `Liturgy` in recursive layers of functionality.

An `AuditingDecorator` intercepts the execution, injecting crucial enterprise logging before and after delegating to the wrapped spell. These decorators can be stacked endlessly—adding caching, security checks, and transaction boundaries—ensuring that the core logic remains pristine while the necessary bureaucratic wards are tightly bound around it at runtime.
