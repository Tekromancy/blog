---
title: "Flyweight: Apprentice Block Magic"
description: "Mastering the Flyweight using Feline Familiar Glyphs."
type: scratch
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Minima"
formula: |2
  [when green flag clicked]
  [say [Casting Flyweight spell...] for (2) seconds]
  [broadcast [invoke_flyweight v]]
tags: [structural, scratch, block-magic, familiar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Flyweight: Feline Familiar Glyphs

## Lore of the Apprentice

In the early days of their arcane journey, apprentice mages learn to weave their first spells not through complex runic scripts, but via tangible, vibrant **Feline Familiar Glyphs**—commonly known as *Scratch Blocks*. These blocks lock together with an undeniable metaphysical click, preventing disastrous miscasts that could otherwise turn a budding wizard into a toad.

The **Flyweight** pattern is one such foundational weave. By snapping the colorful blocks together, an apprentice establishes safe, reliable magical flows before advancing to raw text-based incantations.

## The Glyph Weave

```text
[when I receive [invoke_flyweight v]]
[set [mana v] to (10)]
[repeat (3)]
  [change [mana v] by (-2)]
  [say [Channeling Flyweight...] for (1) seconds]
[end]
[say [Spell Complete!] for (2) seconds]
```

As the Feline Familiar speaks the words of power, the glyphs pulse with raw, foundational energy. The Flyweight holds true, its block-magic unyielding.
