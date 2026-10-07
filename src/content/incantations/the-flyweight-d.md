---
title: Flyweight
description: Efficiently share massive quantities of ethereal motes by externalizing their volatile state.
type: d
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Ethereal Optimization"
formula: |2
  class MoteModel {
      string elementalType;
      this(string t) { elementalType = t; }
  }

  class MoteFactory {
      private MoteModel[string] cache;
      MoteModel getMote(string type) {
          if (type !in cache) {
              cache[type] = new MoteModel(type);
          }
          return cache[type];
      }
  }
tags: [structural, flyweight, dlang, memory-optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Conserve memory during colossal conjurations.
