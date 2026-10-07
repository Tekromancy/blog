---
title: The Morphing State
description: Altering an entity's core behavior based on its progression through strict enterprise phases.
type: java
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  public interface MachineState {
      void process(ServerMachine context);
  }

  public class OfflineState implements MachineState {
      @Override
      public void process(ServerMachine context) {
          System.out.println("Machine is OFFLINE. Booting sequences initiated...");
          context.setState(new OnlineState());
      }
  }

  public class OnlineState implements MachineState {
      @Override
      public void process(ServerMachine context) {
          System.out.println("Machine is ONLINE. Processing enterprise requests.");
          // Complex load-handling logic here
      }
  }

  public class ServerMachine {
      private MachineState currentState;

      public ServerMachine() {
          this.currentState = new OfflineState();
      }

      public void setState(MachineState state) {
          this.currentState = state;
      }

      public void requestService() {
          currentState.process(this);
      }
  }
tags: [state, finite-state-machine, transitions, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Entities in the Java Cathedral rarely exist in a static form. A server transitions from offline, to booting, to online, to degraded. Managing this via massive `switch` statements or chained `if/else` logic is an abomination. The **State** pattern delegates behavior to polymorphing objects.

The `ServerMachine` holds a reference to a `MachineState`. When `requestService()` is invoked, it delegates the action entirely to its current state object. The state itself can mutate the context's internal state—such as the `OfflineState` swapping itself out for the `OnlineState` once booting is complete. The entity appears to magically change its class at runtime, seamlessly adhering to the enterprise lifecycle.
