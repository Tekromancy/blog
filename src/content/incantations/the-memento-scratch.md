---
title: "Memento: Apprentice Block Magic"
description: "Mastering the Memento using Feline Familiar Glyphs."
type: scratch
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronamancy // Recordia"
formula: |2
  [when green flag clicked]
  [say [Casting Memento spell...] for (2) seconds]
  [broadcast [invoke_memento v]]
tags: [behavioral, scratch, block-magic, familiar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Memento: Feline Familiar Glyphs

## Lore of the Apprentice

In the early days of their arcane journey, apprentice mages learn to weave their first spells not through complex runic scripts, but via tangible, vibrant **Feline Familiar Glyphs**—commonly known as *Scratch Blocks*. These blocks lock together with an undeniable metaphysical click, preventing disastrous miscasts that could otherwise turn a budding wizard into a toad.

The **Memento** pattern is one such foundational weave. By snapping the colorful blocks together, an apprentice establishes safe, reliable magical flows before advancing to raw text-based incantations.

## The Glyph Weave

```text
[when I receive [invoke_memento v]]
[set [mana v] to (10)]
[repeat (3)]
  [change [mana v] by (-2)]
  [say [Channeling Memento...] for (1) seconds]
[end]
[say [Spell Complete!] for (2) seconds]
```

As the Feline Familiar speaks the words of power, the glyphs pulse with raw, foundational energy. The Memento holds true, its block-magic unyielding.
