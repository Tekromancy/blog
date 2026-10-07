---
title: The Centralized Mediator
description: Forcing chaotic peer-to-peer communications to flow through a strict bureaucratic hub.
type: java
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Orchestration
formula: |
  public interface CathedralHub {
      void notify(Component sender, String event);
  }
  
  public class HighCouncilHub implements CathedralHub {
      private final Choir choir;
      private final BellTower tower;
      
      public HighCouncilHub(Choir choir, BellTower tower) {
          this.choir = choir;
          this.tower = tower;
          this.choir.setHub(this);
          this.tower.setHub(this);
      }
      
      @Override
      public void notify(Component sender, String event) {
          if (event.equals("SING")) {
              System.out.println("Council commands the bells to toll in rhythm.");
              tower.toll();
          }
      }
  }
  
  public abstract class Component {
      protected CathedralHub hub;
      public void setHub(CathedralHub hub) { this.hub = hub; }
  }
  
  public class Choir extends Component {
      public void sing() {
          System.out.println("Choir begins the chant.");
          hub.notify(this, "SING");
      }
  }
  
  public class BellTower extends Component {
      public void toll() {
          System.out.println("Bells are tolling.");
      }
  }
tags: [mediator, orchestration, decoupling, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When dozens of enterprise systems begin invoking each other directly, the result is a tangled web of dependencies—a "spaghetti" of dark magic. The Java Cathedral enforces order via the **Mediator**.

Instead of the `Choir` holding a direct reference to the `BellTower`, both entities simply hold a reference to the `CathedralHub`. When the choir sings, it blindly sends a notification to the hub. The hub, acting as the supreme orchestrator, interprets the event and commands the bells. This centralization ensures that no two components ever directly couple, maintaining a sterile, modular architecture.
