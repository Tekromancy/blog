---
title: The Encapsulated Command
description: Freezing a spell into a tangible object for queuing, logging, and undoing.
type: java
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Transmutation // Reification"
formula: |2
  public interface HolyOrder {
      void execute();
      void undo();
  }

  public class ExcommunicationTarget {
      public void banish() { System.out.println("Target banished to the Null Void."); }
      public void restore() { System.out.println("Target restored to the classpath."); }
  }

  public class ExcommunicateCommand implements HolyOrder {
      private final ExcommunicationTarget target;

      public ExcommunicateCommand(ExcommunicationTarget target) {
          this.target = target;
      }

      @Override
      public void execute() {
          target.banish();
      }

      @Override
      public void undo() {
          target.restore();
      }
  }

  public class TribunalInvoker {
      private HolyOrder lastOrder;

      public void submitOrder(HolyOrder order) {
          this.lastOrder = order;
          order.execute();
      }

      public void rollback() {
          if (lastOrder != null) {
              lastOrder.undo();
          }
      }
  }
tags: [command, queuing, undo, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the volatile data-streams of the Sprawl, a request cannot merely be an ephemeral method call. The Cathedral demands a trail. The **Command** pattern captures the essence of a method invocation, binding its target and arguments into an immutable `HolyOrder` object.

By turning the act of invocation into an object, the `TribunalInvoker` can queue these orders in a transaction log, execute them at leisure, and most critically—invoke their `undo()` methods. This reification of action allows the high clerics to roll back disastrous enterprise decrees as if turning back time itself.
