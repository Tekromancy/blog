---
title: "The Iterator: Walking the Datastreams"
description: "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation."
type: vala
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  public interface GNOMEArtifice.DataIterator : Object {
      public abstract bool has_next();
      public abstract string get_next();
  }
  
  public interface GNOMEArtifice.DataCollection : Object {
      public abstract DataIterator create_iterator();
  }
  
  public class GNOMEArtifice.MemoryBank : Object, DataCollection {
      public string[] records;
  
      public MemoryBank(string[] records) {
          this.records = records;
      }
  
      public DataIterator create_iterator() {
          return new BankIterator(this);
      }
  }
  
  public class GNOMEArtifice.BankIterator : Object, DataIterator {
      private MemoryBank bank;
      private int position = 0;
  
      public BankIterator(MemoryBank bank) {
          this.bank = bank;
      }
  
      public bool has_next() {
          return this.position < this.bank.records.length;
      }
  
      public string get_next() {
          if (this.has_next()) {
              return this.bank.records[this.position++];
          }
          return "EOF";
      }
  }
tags: [Vala, GObject, Behavioral, Iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The structure of a massive memory bank is largely irrelevant to the seeker of knowledge. The Iterator pattern abstracts the traversal. Rather than risking memory corruption by stepping directly through an array's pointers, the technomancer invokes a `BankIterator`. This scrying sensor provides a uniform pathway—`has_next()` and `get_next()`—allowing the GNOME Artifice to safely walk the datastreams, ignorant of whether the archives are stored in silicon, organic gel, or crystalline matrices.
