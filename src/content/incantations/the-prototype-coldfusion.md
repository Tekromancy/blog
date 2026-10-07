---
title: The Prototype of the Doppelganger
description: Clone existing apparitions rather than re-conjuring them from scratch.
type: coldfusion
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  component name="Spirit" {
      property name="name" type="string";
      property name="power" type="numeric";

      public Spirit function init(string name, numeric power) {
          this.name = arguments.name;
          this.power = arguments.power;
          return this;
      }

      public Spirit function clone() {
          return new Spirit(this.name, this.power); // Or use duplicate() for structs
      }
  }

  // Client
  original = new Spirit("Banshee", 9000);
  doppelganger = original.clone();
tags: [prototype, coldfusion, cloning, duplication]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rather than spending precious server-side mana on fresh conjurations, the Prototype pattern clones existing entities. In the realm of ColdFusion, a `duplicate()` or a precise `clone` method allows a master illusionist to quickly flood the binding circle with copies of a single ward.
