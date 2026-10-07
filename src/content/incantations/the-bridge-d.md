---
title: Bridge
description: Decouple a spell's abstraction from its elemental implementation so the two can vary independently.
type: d
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Aspect Separation"
formula: |2
  interface ElementalCore { string channel(); }
  class FireCore : ElementalCore { override string channel() { return "Fire"; } }

  abstract class SpellForm {
      protected ElementalCore core;
      this(ElementalCore c) { core = c; }
      abstract void invoke();
  }

  class BlastForm : SpellForm {
      this(ElementalCore c) { super(c); }
      override void invoke() { /* Use core.channel() */ }
  }
tags: [structural, bridge, dlang, abstraction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Separates a magical form from its raw elemental source.
