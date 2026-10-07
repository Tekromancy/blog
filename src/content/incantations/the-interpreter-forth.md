---
title: Interpreter (Forth)
description: Invoke the outer dark to parse chaotic incantations.
type: forth
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Void-Parsing"
formula: |2
  \ Void-Parsing: The Interpreter
  \ Using EVALUATE to parse dynamic strings as code.

  : SUMMON ( -- ) ." Summoning circle drawn." CR ;
  : BIND ( -- ) ." Chains of binding applied." CR ;

  : RUN-SCROLL ( c-addr u -- )
    ." Reading from the forbidden scroll..." CR
    EVALUATE ;

  \ Usage:
  \ S" SUMMON BIND" RUN-SCROLL
tags: [behavioral, interpreter, forth, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Forth is its own interpreter. To construct a domain-specific language or parse dynamic spells, we simply pass strings containing our arcane syntax into `EVALUATE`. The outer interpreter takes over, executing the void-text as if it were compiled reality.
