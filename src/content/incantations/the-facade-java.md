---
title: The Opaque Facade
description: Concealing a tangled nightmare of subsystems behind a single, elegant stone wall.
type: java
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Masking"
formula: |2
  class IncenseBurner {
      void ignite() { System.out.println("Incense burning."); }
  }

  class Choir {
      void sing() { System.out.println("Choir intones the hex-chants."); }
  }

  class BellTower {
      void toll() { System.out.println("Bells toll to ward off anomalies."); }
  }

  public class CathedralFacade {
      private final IncenseBurner burner;
      private final Choir choir;
      private final BellTower bells;

      public CathedralFacade() {
          this.burner = new IncenseBurner();
          this.choir = new Choir();
          this.bells = new BellTower();
      }

      public void beginMass() {
          System.out.println("--- Initiating High Mass ---");
          burner.ignite();
          bells.toll();
          choir.sing();
      }
  }
tags: [facade, simplification, api, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Deep within the catacombs of the enterprise, there exist sprawling, incomprehensible subsystems of archaic classes tightly coupled in dark rituals. Exposing these directly to an adept is a recipe for madness. The **Facade** constructs a monolithic, opaque wall in front of the chaos.

The `CathedralFacade` offers a simple, unified `beginMass()` method. The caller does not need to know the proper sequence of igniting the incense, tolling the bells, or cuing the choir. The facade orchestrates the internal chaos behind a clean, orthodox API, protecting the wider system from the gnashing gears of the Cathedral's darkest depths.
