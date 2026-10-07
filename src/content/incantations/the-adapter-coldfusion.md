---
title: The Adapter of the Foreign Sigil
description: Translate the invocations of incompatible tag-wards so they may commune.
type: coldfusion
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Linguistics"
formula: |2
  interface name="IModernWard" {
      public void castWard();
  }

  component name="AncientRune" {
      public void function invokeAncientMagic() {
          writeOutput("Ancient powers awaken!");
      }
  }

  component name="RuneAdapter" implements="IModernWard" {
      variables.rune = "";

      public RuneAdapter function init(AncientRune rune) {
          variables.rune = arguments.rune;
          return this;
      }

      public void function castWard() {
          variables.rune.invokeAncientMagic();
      }
  }
tags: [adapter, coldfusion, translation, ancient-sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter takes an Ancient Rune—written in the old dialects of CFML—and wraps it in a modern structural interface. This allows modern binding circles to invoke `castWard()` seamlessly, while the adapter translates the intent down to the old server-side apparition's native tongue.
