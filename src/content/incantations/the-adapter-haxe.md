---
title: The Adapter
description: Translating ancient texts to modern compilers
type: haxe
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  // The Target Interface expected by modern planes
  interface IModernGrimoire {
      public function readSpells():Array<String>;
  }

  // The Adaptee: An ancient text from a legacy realm
  class AncientScroll {
      public function new() {}
      public function decipherGlyphs():String {
          return "Ignis, Terra, Aqua, Aer";
      }
  }

  // The Adapter
  class ScrollAdapter implements IModernGrimoire {
      private var scroll:AncientScroll;

      public function new(scroll:AncientScroll) {
          this.scroll = scroll;
      }

      public function readSpells():Array<String> {
          var glyphs = this.scroll.decipherGlyphs();
          return glyphs.split(", ");
      }
  }
tags: [transmutation, adapter, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter bridges the gap between incompatible realms. When ancient scrolls return comma-separated runes, but modern Haxe targets demand strictly typed Arrays, the Adapter translates the output seamlessly, ensuring cross-realm compatibility.
