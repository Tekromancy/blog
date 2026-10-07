---
title: Memento
description: Capture and externalize the internal state of a wizard's soul so it can be restored to a previous timeline.
type: d
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Soul Anchoring"
formula: |2
  class SoulMemento {
      private int vitality;
      this(int v) { vitality = v; }
      int getVitality() { return vitality; }
  }

  class Wizard {
      int vitality;
      SoulMemento saveToPhylactery() { return new SoulMemento(vitality); }
      void restoreFromPhylactery(SoulMemento m) { vitality = m.getVitality(); }
  }
tags: [behavioral, memento, dlang, snapshot]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Chronological restoration of mutable magical states.
