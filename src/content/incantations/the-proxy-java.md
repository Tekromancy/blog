---
title: The Guardian Proxy
description: Placing an ethereal sentry to control access to the most resource-intensive relics.
type: java
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Guardianship
formula: |
  public interface Relic {
      void commune();
  }
  
  public class TrueRelic implements Relic {
      public TrueRelic() {
          System.out.println("Heavy enterprise load: Awakening the True Relic from deep storage...");
      }
      
      @Override
      public void commune() {
          System.out.println("Communing with the ancient enterprise data.");
      }
  }
  
  public class RelicProxy implements Relic {
      private TrueRelic trueRelic;
      private final String userRole;
      
      public RelicProxy(String userRole) {
          this.userRole = userRole;
      }
      
      @Override
      public void commune() {
          if (!"HighCleric".equals(userRole)) {
              System.out.println("Access Denied: You lack the clearance to touch the relic.");
              return;
          }
          if (trueRelic == null) {
              trueRelic = new TrueRelic(); // Lazy initialization
          }
          trueRelic.commune();
      }
  }
tags: [proxy, security, lazy-loading, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Not all adepts are worthy of touching the deep data of the Cathedral, and awakening ancient systems is an expensive ritual. The **Proxy** places an ethereal guardian between the caller and the `TrueRelic`.

The `RelicProxy` acts exactly like the true object, implementing the same `Relic` interface. However, it holds the power to delay the heavy instantiation of the relic until it is absolutely necessary (Lazy Initialization), and strictly enforces RBAC (Role-Based Access Control) to prevent lower-tier acolytes from unleashing devastating structural queries.
