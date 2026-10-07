---
title: Prototype
description: Clone existing shadow constructs and magical anomalies without depending on their concrete classes.
type: d
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Shadow Duplication"
formula: |2
  interface ICloneable {
      ICloneable clone();
  }

  class ShadowClone : ICloneable {
      int shadowIntensity;
      this(int i) { shadowIntensity = i; }

      override ShadowClone clone() {
          return new ShadowClone(this.shadowIntensity);
      }
  }
tags: [creational, prototype, dlang, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Duplicate complex ethereal states securely.
