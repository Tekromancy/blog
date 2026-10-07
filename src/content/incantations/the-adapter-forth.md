---
title: Adapter (Forth)
description: Bend the stack effects of alien artifacts to your will.
type: forth
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Spell-Shaping"
formula: |2
  \ Spell-Shaping: The Adapter
  \ Modifying stack signatures to fit expected interfaces.

  \ Alien word expects: ( y x -- )
  : ALIEN-BLAST ( y x -- )
    ." Blast coords: X=" . ." Y=" . CR ;

  \ Our domain expects: ( x y -- )
  \ The Adapter simply swaps the stack parameters
  : ADAPTED-BLAST ( x y -- )
    SWAP ALIEN-BLAST ;

  \ Usage:
  \ 10 20 ADAPTED-BLAST
tags: [structural, adapter, forth, spell-shaping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When incorporating lost, alien magics into your codebase, their stack signatures often clash with yours. The Adapter is merely a wrapper word that shuffles the data stack (`SWAP`, `ROT`, `DROP`) into alignment before invoking the foreign power.
