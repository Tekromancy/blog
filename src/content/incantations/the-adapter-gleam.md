---
title: The Adapter
description: Bridging arcane interfaces through wrapper functions.
type: gleam
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Shifting"
formula: |2
  // Old API
  pub type AncientScroll { AncientScroll(text: String) }
  pub fn decipher(scroll: AncientScroll) -> String { scroll.text }

  // New API
  pub type ModernTablet { ModernTablet(content: String) }

  // Adapter
  pub fn scroll_to_tablet(scroll: AncientScroll) -> ModernTablet {
    ModernTablet(content: decipher(scroll))
  }
tags: [transmutation, adapter, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Adapter
A pure function maps the shape of ancient magic into modern, type-safe structures.
