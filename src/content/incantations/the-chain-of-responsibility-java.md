---
title: The Inquisitor's Chain of Responsibility
description: Passing heretical requests along a chain of handlers until one takes action.
type: java
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Divination // Routing
formula: |
  public abstract class Inquisitor {
      protected Inquisitor next;
      
      public void setNext(Inquisitor next) {
          this.next = next;
      }
      
      public void processHeresy(int severity) {
          if (canHandle(severity)) {
              executeJudgment(severity);
          } else if (next != null) {
              System.out.println(this.getClass().getSimpleName() + " passes the judgment upward.");
              next.processHeresy(severity);
          } else {
              System.out.println("Heresy level " + severity + " is beyond even the High Council. The system falls.");
          }
      }
      
      protected abstract boolean canHandle(int severity);
      protected abstract void executeJudgment(int severity);
  }
  
  public class NoviceInquisitor extends Inquisitor {
      @Override protected boolean canHandle(int severity) { return severity <= 10; }
      @Override protected void executeJudgment(int severity) {
          System.out.println("Novice Inquisitor resolves minor anomaly.");
      }
  }
  
  public class GrandInquisitor extends Inquisitor {
      @Override protected boolean canHandle(int severity) { return severity <= 100; }
      @Override protected void executeJudgment(int severity) {
          System.out.println("Grand Inquisitor purges severe corruption.");
      }
  }
tags: [chain-of-responsibility, routing, enterprise, inquisitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When an anomaly is detected in the JVM, the rigid protocols of the Cathedral dictate that it must be evaluated by the proper authorities. The **Chain of Responsibility** weaves a linked list of handlers. 

Instead of a monolithic switch statement to determine jurisdiction, a request is handed to the `NoviceInquisitor`. If the severity is too high, they defer to their superior. This chain can be dynamically configured at runtime, allowing the enterprise to inject new layers of bureaucracy without altering the core routing spells.
