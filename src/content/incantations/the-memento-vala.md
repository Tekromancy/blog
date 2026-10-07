---
title: "The Memento: The Cortical Engram"
description: "Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later."
type: vala
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Preservation"
formula: |2
  public class GNOMEArtifice.Engram : Object {
      public string state { get; private set; }
  
      public Engram(string state) {
          this.state = state;
      }
  }
  
  public class GNOMEArtifice.CyberBrain : Object {
      public string thought_pattern { get; set; }
  
      public Engram save() {
          print(@"Saving engram of thought pattern: $(this.thought_pattern)\n");
          return new Engram(this.thought_pattern);
      }
  
      public void restore(Engram memento) {
          this.thought_pattern = memento.state;
          print(@"Restored engram. Thought pattern is now: $(this.thought_pattern)\n");
      }
  }
  
  public class GNOMEArtifice.CorticalStack : Object {
      private GenericArray<Engram> history;
  
      public CorticalStack() {
          this.history = new GenericArray<Engram>();
      }
  
      public void push(Engram engram) {
          this.history.add(engram);
      }
  
      public Engram pop() {
          if (this.history.length > 0) {
              Engram e = this.history[this.history.length - 1];
              this.history.remove_index(this.history.length - 1);
              return e;
          }
          return null;
      }
  }
tags: [Vala, GObject, Behavioral, Memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Venturing into deep hostile networks risks severe logic damage. To prevent total ego death, a technomancer must back up their CyberBrain. The Memento pattern safely extracts the mind's current state—without exposing its fragile internal neural architecture to the harsh environment. Stored in a resilient Cortical Stack, these Engrams act as perfect save-states. Should the run go awry, the GNOME Artifice simply restores the pristine Engram.
