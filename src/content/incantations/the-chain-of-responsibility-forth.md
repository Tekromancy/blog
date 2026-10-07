---
title: Chain of Responsibility (Forth)
description: Pass the soul down the ward-chain until one shatters it.
type: forth
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Ward-Chaining"
formula: |2
  \ Ward-Chaining: Chain of Responsibility
  \ A sequence of handlers checking if they should act.

  : FIRE-WARD ( dmg type -- dmg type unhandled? )
    DUP 1 = IF
      ." Fire ward absorbs the blow!" CR
      2DROP 0 0 0  \ Handled
    ELSE 1 THEN ;

  : ICE-WARD ( dmg type -- dmg type unhandled? )
    DUP 2 = IF
      ." Ice ward shatters the impact!" CR
      2DROP 0 0 0
    ELSE 1 THEN ;

  : DAMAGE-CHAIN ( dmg type -- )
    FIRE-WARD IF
      ICE-WARD IF
        ." Damage bypasses all wards!" CR 2DROP
      THEN
    THEN ;

  \ Usage:
  \ 50 1 DAMAGE-CHAIN  \ 1 is Fire
  \ 50 3 DAMAGE-CHAIN  \ 3 is Unknown
tags: [behavioral, chain-of-responsibility, forth, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By stringing conditional checks along the stack, the Chain of Responsibility is forged. The event (damage, soul-type, invocation) is handed from one ward to the next. If a ward can handle it, the stack is cleared; otherwise, it is passed down into the darkness.
