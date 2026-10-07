---
title: The Flyweight of the Nano-Kittens
description: Using sharing to support large numbers of fine-grained feline runes efficiently.
type: lolcode
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm-Logic"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  I HAS A SHARED_TEXTURE ITZ "GLOWING_CYAN_FUR.png"

  HOW IZ I SPAWN_NANO_KITTEN YR ID AN YR X AN YR Y
    VISIBLE "SPAWNED KITTEN " ID " AT " X "," Y
    VISIBLE "USING SHARED TEXTURE: " SHARED_TEXTURE
  IF U SAY SO

  I IZ SPAWN_NANO_KITTEN YR 1 AN YR 10 AN YR 20 MKAY
  I IZ SPAWN_NANO_KITTEN YR 2 AN YR 15 AN YR 25 MKAY

  KTHXBYE
tags: [flyweight, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Flyweight technique compresses the memory footprint of a massive nano-kitten swarm by sharing intrinsic state like fur textures, allowing millions of cyber-felines to render simultaneously.
