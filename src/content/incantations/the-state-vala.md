---
title: "The State: The Plasma Reactor"
description: "Allow an object to alter its behavior when its internal state changes."
type: vala
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase"
formula: |2
  public interface GNOMEArtifice.CoreState : Object {
      public abstract void handle_request(Reactor reactor);
  }
  
  public class GNOMEArtifice.StableState : Object, CoreState {
      public void handle_request(Reactor reactor) {
          print("Reactor is STABLE. Output is nominal.\n");
          reactor.set_state(new CriticalState());
      }
  }
  
  public class GNOMEArtifice.CriticalState : Object, CoreState {
      public void handle_request(Reactor reactor) {
          print("Reactor is CRITICAL! Venting plasma...\n");
          reactor.set_state(new StableState());
      }
  }
  
  public class GNOMEArtifice.Reactor : Object {
      private CoreState current_state;
  
      public Reactor() {
          this.current_state = new StableState();
      }
  
      public void set_state(CoreState state) {
          this.current_state = state;
      }
  
      public void request() {
          this.current_state.handle_request(this);
      }
  }
tags: [Vala, GObject, Behavioral, State]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A GNOME Artifice Plasma Reactor is a beast of many moods. Managing its behavior with massive conditional switch statements leads to terrifying bugs when the pressure spikes. The State pattern transubstantiates the mood into an object. When the Reactor is `Stable`, a request draws nominal power. When the phase shifts to `Critical`, the very class handling the request swaps out in memory, instantly altering the Reactor's reaction to vent plasma and avert annihilation.
