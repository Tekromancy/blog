---
title: Command (Forth)
description: Encapsulate actions as pure Execution Tokens on the stack.
type: forth
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Rune-Binding"
formula: |2
  \ Rune-Binding: The Command Pattern
  \ Treating actions as data using XTs (Execution Tokens).

  : SPELL-HEAL ( -- ) ." Vitality restored." CR ;
  : SPELL-HARM ( -- ) ." Flesh boils." CR ;

  \ We push the XT of the spells to the stack and execute them later.
  : CAST-STORED ( xt -- )
    ." Channeling stored rune... " EXECUTE ;

  \ Usage:
  \ ' SPELL-HEAL CAST-STORED
  \ ' SPELL-HARM CAST-STORED
tags: [behavioral, command, forth, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In Forth, the Command pattern is not an emulation—it is native. The Execution Token (`XT`), retrieved via the tick (`'`) operator, perfectly encapsulates an action. It can be pushed to the stack, stored in variables, and invoked via `EXECUTE` at the whim of the necromancer.
