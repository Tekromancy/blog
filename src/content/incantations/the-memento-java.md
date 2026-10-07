---
title: The Temporal Memento
description: Sealing the precise internal state of a spell to allow for temporal restoration.
type: java
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Preservation
formula: |
  public class EnterpriseState {
      private String dataPhase;
      
      public void setPhase(String phase) {
          this.dataPhase = phase;
      }
      
      public String getPhase() {
          return dataPhase;
      }
      
      public Memento saveToMemento() {
          System.out.println("Sealing phase: " + dataPhase);
          return new Memento(dataPhase);
      }
      
      public void restoreFromMemento(Memento memento) {
          this.dataPhase = memento.getSavedPhase();
          System.out.println("Temporal shift: Restored phase to " + dataPhase);
      }
      
      public static class Memento {
          private final String savedPhase;
          
          private Memento(String phaseToSave) {
              this.savedPhase = phaseToSave;
          }
          
          private String getSavedPhase() {
              return savedPhase;
          }
      }
  }
tags: [memento, state, undo, chronomancy, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the volatile rituals of data processing, a misaligned byte can crash the entire server farm. The Java Cathedral uses the **Memento** pattern as a form of sanctioned Chronomancy, allowing the adept to seal the state of an object before attempting dangerous mutations.

By utilizing a private nested class, the `EnterpriseState` generates an immutable `Memento` that contains its internal phase. The `Memento` can be handed off to a Caretaker object for safe-keeping. Because its internal variables are hidden from the outside world, the enterprise encapsulation is perfectly preserved. If the mutation fails, the saved memento is ingested, seamlessly rolling back time.
