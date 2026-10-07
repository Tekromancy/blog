---
title: The Command of the Laser Pointer
description: Encapsulating a request as an object, letting you parameterize feline runes with different requests.
type: lolcode
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Telekinesis"
formula: |2
  HAI 1.2
  CAN HAS STDIO?

  HOW IZ I POUNCE_CMD
    VISIBLE "CAT POUNCES ON THE RED DOT!"
  IF U SAY SO

  HOW IZ I SLEEP_CMD
    VISIBLE "CAT ENTERS STANDBY MODE."
  IF U SAY SO

  HOW IZ I EXECUTE_CMD YR CMD_FUNC
    VISIBLE "INVOKING COMMAND PROTOCOL..."
    I IZ CMD_FUNC MKAY
  IF U SAY SO

  OBTW In LOLCODE we might just call functions or pass string names T_T TLDR
  I IZ POUNCE_CMD MKAY
  I IZ SLEEP_CMD MKAY

  KTHXBYE
tags: [command, feline, cyber-runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command pattern translates user interactions—like the chaotic movements of a laser pointer—into encapsulated spell-objects that can be stored, queued, or executed by the cyber-cat at will.
