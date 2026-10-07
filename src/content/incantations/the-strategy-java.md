---
title: The Tactical Strategy
description: Swapping the algorithmic core of a spell dynamically based on the Cathedral's tactical needs.
type: java
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Transmutation // Algorithmics"
formula: |2
  public interface PurgeStrategy {
      void executePurge(String dataSector);
  }

  public class FireWallPurge implements PurgeStrategy {
      @Override
      public void executePurge(String dataSector) {
          System.out.println("Deploying heavy firewall algorithms to incinerate " + dataSector);
      }
  }

  public class SilentAuditPurge implements PurgeStrategy {
      @Override
      public void executePurge(String dataSector) {
          System.out.println("Silently nullifying corrupted bits in " + dataSector + " without raising alarms.");
      }
  }

  public class InquisitorSquad {
      private PurgeStrategy strategy;

      public InquisitorSquad(PurgeStrategy strategy) {
          this.strategy = strategy;
      }

      public void setStrategy(PurgeStrategy strategy) {
          this.strategy = strategy;
      }

      public void cleanse(String sector) {
          strategy.executePurge(sector);
      }
  }
tags: [strategy, algorithm, injection, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the eternal war against entropy, hardcoding a singular attack vector is a fatal flaw. The **Strategy** pattern embraces composition, extracting the core algorithms into interchangeable spell-cartridges.

An `InquisitorSquad` is not bound to a single method of cleansing a corrupted sector. By relying on the `PurgeStrategy` interface, the squad can be dynamically reconfigured at runtime via `setStrategy()`. Whether the situation demands a blunt `FireWallPurge` or a subtle `SilentAuditPurge`, the Cathedral's execution logic seamlessly adapts without altering the structural class hierarchy.
