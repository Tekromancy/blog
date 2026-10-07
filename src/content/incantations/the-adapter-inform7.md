---
title: The Adapter
description: A mystical translation matrix that allows foreign runic spells to be cast via familiar invocation semantics.
type: inform7
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Prose-Based Spellcasting"
formula: |2
  A foreign rune is a kind of thing. A foreign rune has a text called the alien vibration.
  
  To resonate (R - a foreign rune):
      say "The rune emits a strange vibration: [alien vibration of R]."
      
  A familiar spell is a kind of thing.
  
  To invoke (S - a familiar spell):
      say "You chant the familiar syllables."
      
  A rune adapter is a kind of familiar spell. A rune adapter has a foreign rune called the contained rune.
  
  [The adapter bridges the invocation semantics]
  To invoke (A - a rune adapter):
      resonate the contained rune of A.
tags: [structural, transmutation, adapter, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
